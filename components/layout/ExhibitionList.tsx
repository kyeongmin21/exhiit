'use client'

import Image from "next/image";
import {useState, useMemo} from 'react';
import {formatDate} from '@/utils/date';
import {useExhibitions} from '@/hooks/useExhibitions';
import FilterBox from '@/components/filter/FilterBar';
import {ExhibitionItem} from '@/types/exhibitionTypes';


export default function ExhibitionList() {
    const {data, isLoading, isError} = useExhibitions();
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredItems = useMemo(() => {
        if (!data?.items) return [];

        return data.items.filter((item: ExhibitionItem) => {
            // 지역 필터링
            let matchRegion = false;
            if (selectedRegion === '전체') {
                matchRegion = true;
            } else if (selectedRegion === '경상') {
                matchRegion = ['경상', '경북', '경남', '부산', '대구', '울산'].some(key => item.eventSite.includes(key));
            } else if (selectedRegion === '전라') {
                matchRegion = ['전라', '전북', '전남', '광주'].some(key => item.eventSite.includes(key));
            } else if (selectedRegion === '충청') {
                matchRegion = ['충청', '충북', '충남', '대전', '세종'].some(key => item.eventSite.includes(key));
            } else {
                matchRegion = item.eventSite.includes(selectedRegion);
            }

            // 날짜 필터링
            let matchDate = true;
            if (startDate || endDate) {
                const [itemStart, itemEnd] = item.eventPeriod.split('~').map(d => d.trim());
                if (startDate && endDate) {
                    // 선택 범위와 전시 기간이 하나라도 겹치면 표시
                    matchDate = startDate <= itemEnd && endDate >= itemStart;
                } else if (startDate) {
                    matchDate = startDate <= itemEnd;
                } else if (endDate) {
                    matchDate = endDate >= itemStart;
                }
            }

            return matchRegion && matchDate;
        });
    }, [data, selectedRegion, startDate, endDate]);

    if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>;
    if (isError) return <div className="p-10 text-center">오류가 발생했어요 ㅜㅜ</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">exhiit</h1>

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
                    <div key={index} className="rounded-xl overflow-hidden shadow hover:shadow-md transition">
                        <div className='relative w-full h-48'>
                            {item.imageObject ? (
                                <Image
                                    fill
                                    priority
                                    src={item.imageObject}
                                    alt={item.title}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">이미지 없음</span>
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                            <p className="font-semibold text-sm line-clamp-2">{item.period}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.eventSite}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {item.eventPeriod.split('~').map(d => formatDate(d.trim())).join(' ~ ')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && !isLoading && (
                <div className="text-center py-20 text-gray-400">
                    조건에 맞는 전시가 없습니다.
                </div>
            )}
        </div>
    );
}
