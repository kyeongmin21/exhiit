import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'www.culture.go.kr',
                port: '',
                pathname: '/**', // 모든 경로 허용
            },
        ],
        // 외부 서버 헤더가 max-age=0이어도, Next.js가 최소 하루는 캐싱하게 만듭니다.
        minimumCacheTTL: 86400,
    },
};

export default nextConfig;
