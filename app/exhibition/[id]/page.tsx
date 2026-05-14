'use client'

import {use} from 'react';
import KakaoMap from "@/components/map/KakaoMap";
import {useExhibitionDetail} from '@/hooks/useExhibitionDetail';
import {formatDate} from '@/utils/date';

export default function ExhibitionDetailPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);
    const item = useExhibitionDetail(id);

    if (!item) return <div className="p-10 text-center">불러오는 중...</div>;

    return (
        <div className="max-w-full px-4 py-8 flex flex-col md:flex-row gap-8">

            <div className="flex flex-col gap-4 md:w-1/2">
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <div className="text-sm text-gray-500 flex flex-col gap-2">
                    <p>📍 {item.address ?? item.eventSite}</p>
                    <p>📅 {item.eventPeriod.split('~').map(d => formatDate(d.trim())).join(' ~ ')}</p>
                </div>
                <a href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full text-center py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                >
                    예약하기
                </a>
            </div>

            <div className="w-full md:w-1/2 h-80 md:h-auto rounded-xl overflow-hidden order-last md:order-first">
                <KakaoMap lat={item.lat} lng={item.lng} />
            </div>

        </div>
    );
}
