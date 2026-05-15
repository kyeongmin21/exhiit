import {useInfiniteQuery} from '@tanstack/react-query'
import {ExhibitionsResponse} from "@/types/exhibitionTypes";

// https://www.culture.go.kr/data/openapi/openapiView.do?id=580&category=A&orderBy=rdfCnt&gubun=A#/default/%EC%9A%94%EC%B2%AD%EB%A9%94%EC%8B%9C%EC%A7%80%20Get

export const fetchExhibitions = async (pageNo = 1): Promise<ExhibitionsResponse> => {
    const res = await fetch(
        `https://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${process.env.NEXT_PUBLIC_CULTURE_API_KEY}&numOfRows=20&pageNo=${pageNo}&dtype=전시`,
        {
            headers: {'accept': 'application/json'}
        }
    )
    const json = await res.json()
    const body = json.response.body

    return {
        items: body.items.item,
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
            const hasMore = pageNo * Number(lastPage.numOfRows) < totalCount
            return hasMore ? pageNo + 1 : undefined
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60,   // ← 1시간 캐시
        gcTime: 1000 * 60 * 60 * 24, // ← 24시간 유지
    })
}
