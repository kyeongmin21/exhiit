'use client';

import { useEffect, useRef } from 'react';

export default function KakaoMap() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = () => {
            if (!window.kakao?.maps || !mapRef.current) return;

            window.kakao.maps.load(() => {
                // 현재 위치 가져오기
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        const options = {
                            center: new window.kakao.maps.LatLng(lat, lng),
                            level: 3,
                        };

                        const map = new window.kakao.maps.Map(
                            mapRef.current!,
                            options
                        );

                        // 마커 추가
                        const markerPosition = new window.kakao.maps.LatLng(
                            lat,
                            lng
                        );

                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });

                        marker.setMap(map);
                    },

                    // 위치 권한 거부 or 실패
                    (error) => {
                        console.error(error);

                        // fallback 좌표
                        const options = {
                            center: new window.kakao.maps.LatLng(
                                33.450701,
                                126.570667
                            ),
                            level: 3,
                        };

                        new window.kakao.maps.Map(
                            mapRef.current!,
                            options
                        );
                    }
                );
            });
        };

        if (window.kakao?.maps) {
            initMap();
        } else {
            window.addEventListener('kakao-sdk-load', initMap);
        }

        return () =>
            window.removeEventListener('kakao-sdk-load', initMap);
    }, []);

    return (
        <div
            ref={mapRef}
            style={{ width: '500px', height: '400px' }}
        />
    );
}
