import createNextJsObfuscator from 'nextjs-obfuscator';

const withNextJsObfuscator = createNextJsObfuscator(
    {
        rotateStringArray: true,
        disableConsoleOutput: false,
    },
    {
        enabled: 'detect',
        patterns: [
            // Obfuscate all client-side code under app & components
            './app/**/*.(js|jsx|ts|tsx)',
            './components/**/*.(js|jsx|ts|tsx)',
        ],
        exclude: [
            // Exclude server-only / critical runtime pieces to keep production stable
            './app/api/**/*',
            './middleware.ts',
            './app/meta/**/*',
            './app/generateMetadata.js',
            './app/[...not-found]/generateMetadata.js',
            './app/required/generateMetadata.js',
            './app/required-confirm/generateMetadata.js',
            './next.config.mjs',
            './tailwind.config.js',
            './postcss.config.mjs',
            './jsconfig.json',
            './tsconfig.json'
        ],
        log: true,
    }
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            'node:crypto': 'commonjs crypto',
        });
        return config;
    },
};

export default withNextJsObfuscator(nextConfig);
