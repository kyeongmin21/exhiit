'use client'

import {useState} from 'react';
import {useFilter} from '@/hooks/useFilter';
import {useExhibitions} from '@/hooks/useExhibitions';
import FilterBox from '@/components/filter/FilterBar';
import ExhibitionCard from "@/components/exhibition/ExhibitionCard";
import {ExhibitionItem} from '@/types/exhibitionTypes';


export default function ExhibitionList() {
    const {data, isLoading, isError} = useExhibitions();
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const filteredItems = useFilter(data, selectedRegion, startDate, endDate);

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
                    <ExhibitionCard key={index} item={item}/>
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
