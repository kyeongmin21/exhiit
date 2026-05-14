'use client'

import {useEffect, useState, useRef} from 'react';
import {useFilter} from '@/hooks/useFilter';
import {extractId} from "@/utils/exhibiton";
import {useExhibitions} from '@/hooks/useExhibitions';
import FilterBox from '@/components/filter/FilterBar';
import ExhibitionCard from "@/components/exhibition/ExhibitionCard";
import {ExhibitionItem} from '@/types/exhibitionTypes';
import Link from "next/link";


export default function ExhibitionList() {
    const observerRef = useRef<HTMLDivElement | null>(null);

    const {data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useExhibitions();
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // pages 합치기
    const allItems = data?.pages.flatMap(page => page.items) ?? [];
    const filteredItems = useFilter(allItems, selectedRegion, startDate, endDate);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            {threshold: 0.5}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);


    if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>;
    if (isError) return <div className="p-10 text-center">오류가 발생했어요 ㅜㅜ</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            <FilterBox
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item: ExhibitionItem, index: number) => (
                    <Link key={index} href={`/exhibition/${extractId(item.url)}`}>
                        <ExhibitionCard item={item}/>
                    </Link>
                ))}
            </div>

            {/* 스크롤 감지 영역 */}
            <div ref={observerRef} className="h-10"/>
            {isFetchingNextPage && (
                <div className="text-center py-5">
                    더 불러오는 중...
                </div>
            )}

            {filteredItems.length === 0 && !isLoading && (
                <div className="text-center py-20 text-gray-400">
                    조건에 맞는 전시가 없습니다.
                </div>
            )}
        </div>
    );
}
