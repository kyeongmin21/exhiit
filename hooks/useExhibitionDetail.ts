import {useInfiniteQuery} from '@tanstack/react-query'
import {fetchExhibitions} from '@/hooks/useExhibitions'

export function useExhibitionDetail(pSeq: string) {
    const {data} = useInfiniteQuery({
        queryKey: ['exhibitions'],
        queryFn: ({pageParam}) => fetchExhibitions(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pageNo = Number(lastPage.pageNo)
            const totalCount = Number(lastPage.totalCount)
            return pageNo * 20 < totalCount ? pageNo + 1 : undefined
        },
        staleTime: 1000 * 60 * 5,  // 5분 캐시 유지
    })

    const allItems = data?.pages.flatMap(page => page.items) ?? []
    return allItems.find(item => item.url?.includes(`pSeq=${pSeq}`)) ?? null
}
