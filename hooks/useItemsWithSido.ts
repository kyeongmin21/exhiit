import { useQueries } from '@tanstack/react-query';
import { getPlaceSido } from '@/utils/kakao';
import { ExhibitionItem } from '@/types/exhibitionTypes';

export function useItemsWithSido(items: ExhibitionItem[], selectedRegion: string) {
    const needsKakao = selectedRegion !== '전체';

    // 중복 장소 제거
    const uniqueSites = [...new Set(items.map(item => item.eventSite))];

    const results = useQueries({
        queries: uniqueSites.map(site => ({
            queryKey: ['place', site],
            queryFn: () => getPlaceSido(site),
            staleTime: Infinity,
            enabled: needsKakao,
        }))
    });

    // 장소명 → 결과 맵
    const siteMap = Object.fromEntries(
        uniqueSites.map((site, i) => [site, results[i]?.data])
    );

    return {
        enrichedItems: items.map(item => ({
            ...item,
            sido: siteMap[item.eventSite]?.sido ?? null,
            address: siteMap[item.eventSite]?.address ?? null,
            lat: siteMap[item.eventSite]?.lat ?? null,
            lng: siteMap[item.eventSite]?.lng ?? null,
        })),
        isEnriching: needsKakao && results.some(r => r.isLoading),
    };
}
