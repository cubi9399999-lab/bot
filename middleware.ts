import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import DeviceDetector from 'device-detector-js';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent')?.toLowerCase().trim() || '';
    const url = request.nextUrl;
    const pathname = url.pathname;
    
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.endsWith('.ico') ||
        pathname.endsWith('.png') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.gif') ||
        pathname.endsWith('.svg')
    ) {
        return NextResponse.next();
    }

    // Phân tích user-agent
    const deviceDetector = new DeviceDetector();
    let device;
    try {
        device = deviceDetector.parse(userAgent);
    } catch (err) {
        console.error('Failed to parse user-agent:', userAgent);
    }

    const blockedKeywords = [
        `AI2Bot`,
        `Ai2Bot-Dolma`,
        `aiHitBot`,
        `Amazonbot`,
        `Andibot`,
        `anthropic-ai`,
        `Applebot`,
        `Applebot-Extended`,
        `bedrockbot`,
        `Brightbot 1.0`,
        `Bytespider`,
        `CCBot`,
        `ChatGPT-User`,
        `Claude-SearchBot`,
        `Claude-User`,
        `Claude-Web`,
        `ClaudeBot`,
        `cohere-ai`,
        `cohere-training-data-crawler`,
        `Cotoyogi`,
        `Crawlspace`,
        `Diffbot`,
        `DuckAssistBot`,
        `EchoboxBot`,
        `FacebookBot`,
        `facebookexternalhit`,
        `Factset_spyderbot`,
        `FirecrawlAgent`,
        `FriendlyCrawler`,
        `Google-CloudVertexBot`,
        `Google-Extended`,
        `GoogleOther`,
        `GoogleOther-Image`,
        `GoogleOther-Video`,
        `GPTBot`,
        `iaskspider/2.0`,
        `ICC-Crawler`,
        `ImagesiftBot`,
        `img2dataset`,
        `ISSCyberRiskCrawler`,
        `Kangaroo Bot`,
        `meta-externalagent`,
        `Meta-ExternalAgent`,
        `meta-externalfetcher`,
        `Meta-ExternalFetcher`,
        `MistralAI-User/1.0`,
        `MyCentralAIScraperBot`,
        `NovaAct`,
        `OAI-SearchBot`,
        `omgili`,
        `omgilibot`,
        `Operator`,
        `PanguBot`,
        `Panscient`,
        `panscient.com`,
        `Perplexity-User`,
        `PerplexityBot`,
        `PetalBot`,
        `PhindBot`,
        `Poseidon Research Crawler`,
        `QualifiedBot`,
        `QuillBot`,
        `quillbot.com`,
        `SBIntuitionsBot`,
        `Scrapy`,
        `SemrushBot`,
        `SemrushBot-BA`,
        `SemrushBot-CT`,
        `SemrushBot-OCOB`,
        `SemrushBot-SI`,
        `SemrushBot-SWA`,
        `Sidetrade indexer bot`,
        `TikTokSpider`,
        `Timpibot`,
        `VelenPublicWebCrawler`,
        `Webzio-Extended`,
        `wpbot`,
        `YandexAdditional`,
        `YandexAdditionalBot`,
        `YouBot`
    ];

    const isBotUA = blockedKeywords.some(keyword => userAgent.includes(keyword));
    const isBot = isBotUA || Boolean(device?.bot);

    if (isBot && !pathname.startsWith('/meta')) {
        return NextResponse.redirect(new URL('/meta', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'
    ],
};
