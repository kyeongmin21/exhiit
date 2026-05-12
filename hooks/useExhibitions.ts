import {useQuery} from '@tanstack/react-query'

const fetchExhibitions = async (pageNo = 1) => {
    const res = await fetch(
            `https://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${process.env.NEXT_PUBLIC_CULTURE_API_KEY}&numOfRows=20&pageNo=${pageNo}&dtype=전시`
    )
    const xmlText = await res.text()

    const items = [...xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match => {
        const item = match[1]
        const get = (tag: string) =>
                item.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's'))?.[1]?.trim() || ''

        return {
            title: get('title'),
            eventPeriod: get('eventPeriod'),
            eventSite: get('eventSite'),
            charge: get('charge'),
            contactPoint: get('contactPoint'),
            url: get('url'),
            imageObject: get('imageObject'),
        }
    })

    return {items}
}

export const useExhibitions = (pageNo = 1) => {
    return useQuery({
        queryKey: ['exhibitions', pageNo],
        queryFn: () => fetchExhibitions(pageNo),
    })
}
