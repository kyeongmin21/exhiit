import {NextRequest, NextResponse} from 'next/server'


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const pageNo = searchParams.get('pageNo') || '1'
    const numOfRows = searchParams.get('numOfRows') || '20'

    const response = await fetch(
            `https://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${process.env.CULTURE_API_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}`,
            {next: {revalidate: 3600}} // 1시간 캐싱
    )

    const xmlText = await response.text()

    // XML → JSON 파싱
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
            description: get('description'),
        }
    })

    return NextResponse.json({items})
}
