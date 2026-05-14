import {useMemo} from "react";
import {SIDO_MAP} from "@/constants/place";
import {ExhibitionItem} from '@/types/exhibitionTypes';


export function useFilter(
    items: ExhibitionItem[],
    selectedRegion: string,
    startDate: string,
    endDate: string
) {
    return useMemo(() => {

        return items.filter((item: ExhibitionItem) => {
            // 지역 필터링
            let matchRegion = false;
            if (selectedRegion === '전체') {
                matchRegion = true;
            } else if (!item.sido) {
                matchRegion = false; // 카카오 검색 실패한 항목은 제외
            } else {
                matchRegion = SIDO_MAP[selectedRegion]?.some(s => item.sido!.includes(s)) ?? false;
            }

            // 날짜 필터링
            let matchDate = true;
            const selectedStart = startDate.replace(/-/g, '');
            const selectedEnd = endDate.replace(/-/g, '');

            if (startDate || endDate) {
                const [rawStart, rawEnd] = item.eventPeriod.split('~').map(d => d.trim());
                const itemStart = rawStart.replace(/[^0-9]/g, '');
                const itemEnd = rawEnd.replace(/[^0-9]/g, '');

                if (startDate && endDate) {
                    matchDate = selectedStart <= itemEnd && selectedEnd >= itemStart;
                } else if (startDate) {
                    matchDate = selectedStart <= itemEnd;
                } else if (endDate) {
                    matchDate = selectedEnd >= itemStart;
                }
            }

            return matchRegion && matchDate;
        });
    }, [items, selectedRegion, startDate, endDate]);
}
