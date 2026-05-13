'use client';
import {useEffect, useRef} from 'react';

export default function KakaoMap() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = () => {
            if (window.kakao?.maps && mapRef.current) {
                window.kakao.maps.load(() => {
                    const options = {
                        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                        level: 3,
                    };
                    new window.kakao.maps.Map(mapRef.current!, options);
                });
            }
        };

        // 1. 이미 로드되어 있는 경우 바로 실행
        if (window.kakao?.maps) {
            initMap();
        } else {
            // 2. 아직 로드 전이면 이벤트를 기다림
            window.addEventListener('kakao-sdk-load', initMap);
        }

        return () => window.removeEventListener('kakao-sdk-load', initMap);
    }, []);

    return <div ref={mapRef} style={{width: '500px', height: '400px'}}/>;
}
