import {useInfiniteQuery} from '@tanstack/react-query'
import {getPlaceSido} from '@/utils/kakao'
import {ExhibitionItem, ExhibitionsResponse} from "@/types/exhibitionTypes";

// https://www.culture.go.kr/data/openapi/openapiView.do?id=580&category=A&orderBy=rdfCnt&gubun=A#/default/%EC%9A%94%EC%B2%AD%EB%A9%94%EC%8B%9C%EC%A7%80%20Get

const fetchExhibitions = async (pageNo = 1): Promise<ExhibitionsResponse> => {
    const res = await fetch(
        `https://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${process.env.NEXT_PUBLIC_CULTURE_API_KEY}&numOfRows=20&pageNo=${pageNo}&dtype=전시`,
        {
            headers: {'accept': 'application/json'}
        }
    )
    const json = await res.json()
    const body = json.response.body
    const items = body.items.item

    // 카카오 장소검색 병렬 호출
    const enriched = await Promise.allSettled(
        items.map(async (item: ExhibitionItem) => {
            const place = await getPlaceSido(item.eventSite)
            return {
                ...item,
                sido: place?.sido ?? null,
                address: place?.address ?? null,
                lat: place?.lat ?? null,
                lng: place?.lng ?? null
            }
        })
    )

    return {
        items: enriched
            .map(r => r.status === 'fulfilled' ? r.value : null)
            .filter((item): item is ExhibitionItem => item !== null),
        totalCount: body.totalCount,
        numOfRows: body.numOfRows,
        pageNo: body.pageNo,
    }
}

export const useExhibitions = () => {
    return useInfiniteQuery({
        queryKey: ['exhibitions'],
        queryFn: ({pageParam = 1}) => fetchExhibitions(pageParam),
        getNextPageParam: (lastPage) => {
            const pageNo = Number(lastPage.pageNo)
            const totalCount = Number(lastPage.totalCount)
            const hasMore = pageNo * 20 < totalCount
            return hasMore ? pageNo + 1 : undefined
        },
        initialPageParam: 1,
    })
}
