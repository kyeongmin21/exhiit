'use client';
import Script from 'next/script';

export default function KakaoMapScript() {
    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    return (
        <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`}
            strategy="afterInteractive"
            onLoad={() => {
                window.dispatchEvent(new Event('kakao-sdk-load'));
            }}
        />
    );
}
