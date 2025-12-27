import CryptoJS from 'crypto-js';

const secretKey = 'HDNDT-JDHT8FNEK-JJHR';

export function decryptAES(encryptedData: string): string {
    if (!encryptedData || typeof encryptedData !== 'string') {
        throw new Error('Invalid encrypted input');
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) throw new Error('Decryption failed');
    return decrypted;
}
