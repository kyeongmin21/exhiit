'use client'

import {use} from 'react';
import KakaoMap from "@/components/map/KakaoMap";
import {useExhibitionDetail} from '@/hooks/useExhibitionDetail';


export default function ExhibitionDetailPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);
    const item = useExhibitionDetail(id);

    if (!item) return <div className="p-10 text-center">불러오는 중...</div>;

    return (
        <div className="p-10">
            <h1>{item.title}</h1>
            <KakaoMap/>
        </div>
    );
}
