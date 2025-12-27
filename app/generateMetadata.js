import { headers } from 'next/headers';
import DeviceDetector from 'device-detector-js';

export async function generateMetadata() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent')?.toLowerCase() || '';
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    const host = headersList.get('host') || 'localhost:3000';
    const metadataBase = new URL(`${protocol}://${host}`);

    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);

    const isFacebookBot = userAgent.includes('facebookexternalhit') || userAgent.includes('facebot');
    const isInstagramBot = userAgent.includes('instagram');
    const isTelegramBot = userAgent.includes('telegrambot');

    const isAllowedBot = isFacebookBot || isInstagramBot || isTelegramBot;

    if (device.bot && !isAllowedBot) {
        return null;
    }

    return {
        metadataBase,
        title: 'Furniture Next App - Somor Mk'  ,
        icons: {
            icon: '/favicon.png',
        },
        description: 'Designed by Somor Mk.',
        openGraph: {
            images: [`${metadataBase.origin}/thumbnail.png`],
            title: 'Furniture Next App - Somor Mk',
            description: 'Designed by Somor Mk.',
        },
        twitter: {
            images: [`${metadataBase.origin}/thumbnail.png`],
            title: 'Furniture Next App - Somor Mk',
            description: 'Designed by Somor Mk.',
        }
    };
}