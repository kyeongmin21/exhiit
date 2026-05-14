'use client';

import {useEffect, useRef} from 'react';
import {KakaoMapProps} from "@/types/kakaoMap";

export default function KakaoMap({lat, lng}: KakaoMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = () => {
            if (!window.kakao?.maps || !mapRef.current) return;

            window.kakao.maps.load(() => {
                // 공통으로 컨트롤을 추가하는 함수
                const addControls = (map: kakao.maps.Map) => {
                    const zoomControl = new window.kakao.maps.ZoomControl();
                    map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);
                };

                // 전시 위치가 있으면 전시 위치로
                if (lat && lng) {
                    const options = {
                        center: new window.kakao.maps.LatLng(Number(lat), Number(lng)),
                        level: 3,
                    };
                    const map = new window.kakao.maps.Map(mapRef.current!, options);
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(Number(lat), Number(lng)),
                    });
                    marker.setMap(map);

                    // 컨트롤 추가
                    addControls(map);
                    return;
                }

                // 없으면 현재 위치 가져오기
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const currentLat = position.coords.latitude;
                        const currentLng = position.coords.longitude;

                        const options = {
                            center: new window.kakao.maps.LatLng(currentLat, currentLng),
                            level: 3,
                        };

                        const map = new window.kakao.maps.Map(mapRef.current!, options);
                        const marker = new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(currentLat, currentLng),
                        });
                        marker.setMap(map);

                        // 컨트롤 추가
                        addControls(map);
                    },
                    () => {
                        console.warn('위치 권한 거부, fallback 좌표 사용');
                        const options = {
                            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                            level: 3,
                        };
                        const map = new window.kakao.maps.Map(mapRef.current!, options);

                        // 컨트롤 추가
                        addControls(map);
                    }
                );
            });
        };

        if (window.kakao?.maps) {
            initMap();
        } else {
            window.addEventListener('kakao-sdk-load', initMap);
        }

        return () => window.removeEventListener('kakao-sdk-load', initMap);
    }, [lat, lng]);

    return (
        <div ref={mapRef}
             className='rounded-xl overflow-hidden w-full shadow-inner'
             style={{height: '400px'}}/>
    );
}
