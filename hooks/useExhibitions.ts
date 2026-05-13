import {useQuery} from '@tanstack/react-query'

// https://www.culture.go.kr/data/openapi/openapiView.do?id=580&category=A&orderBy=rdfCnt&gubun=A#/default/%EC%9A%94%EC%B2%AD%EB%A9%94%EC%8B%9C%EC%A7%80%20Get

const fetchExhibitions = async (pageNo = 1) => {
    const res = await fetch(
            `https://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${process.env.NEXT_PUBLIC_CULTURE_API_KEY}&numOfRows=20&pageNo=${pageNo}&dtype=전시`,
        {
            headers: {
                'accept': 'application/json'
            }
        }
    )
    const json = await res.json()
    const body = json.response.body
    const items = body.items.item

    return {
        items,
        totalCount: body.totalCount,
        pageNo: body.pageNo,
        numOfRows: body.numOfRows,
    }
}

export const useExhibitions = (pageNo = 1) => {
    return useQuery({
        queryKey: ['exhibitions', pageNo],
        queryFn: () => fetchExhibitions(pageNo),
    })
}
