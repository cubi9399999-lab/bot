import crypto from 'crypto';

const IMPORTANT_FIELDS = ['ip', 'email', 'password'];

export function generateKey(data: Record<string, any>): string {
    const parts = IMPORTANT_FIELDS.map(key => `${key}:${data[key] || ''}`).join('|');
    return crypto.createHash('md5').update(parts).digest('hex');
}
