'use client'
import {FilterBoxProps} from '@/types/filterTypes'
import {REGIONS} from "@/constants/place";

export default function FilterBox({
                                      selectedRegion,
                                      onRegionChange,
                                      startDate,
                                      onStartDateChange,
                                      endDate,
                                      onEndDateChange
                                  }: FilterBoxProps) {
    return (
        <div className="flex flex-wrap items-end gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            {/* 지역 선택 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 text-center">지역</label>
                <select
                    value={selectedRegion}
                    onChange={(e) => onRegionChange(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                    {REGIONS.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            {/* 시작 날짜 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 text-center">시작일</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            {/* 종료 날짜 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 text-center">종료일</label>
                <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            {/* 초기화 버튼 */}
            <button
                onClick={() => {
                    onRegionChange('전체');
                    onStartDateChange('');
                    onEndDateChange('');
                }}
                className="px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50  transition-all"
            >
                필터 초기화
            </button>
        </div>
    );
}
