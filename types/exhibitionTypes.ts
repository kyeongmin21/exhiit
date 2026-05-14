export interface ExhibitionItem {
    title: string
    type: string          // 분야
    period: string        // 기간
    eventPeriod: string   // 시간
    eventSite: string     // 장소
    charge: string        // 금액
    contactPoint: string  // 문의안내
    url: string
    imageObject?: string  // 이미지
    description: string   // 설명
    viewCount: string     // 조회수

    sido?: string | null
    address?: string | null
    lat?: string | null
    lng?: string | null
}

export interface ExhibitionsResponse {
    items: ExhibitionItem[]
    numOfRows: string     // 데이터수
    pageNo: string        // 페이지번호
    totalCount: string    // 전체데이터수
}
