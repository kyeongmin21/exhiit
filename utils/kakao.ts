// 카카오 장소 검색 유틸 만들기

export async function getPlaceSido(keyword: string) {
    // 1차: 전체 이름으로 검색
    let place = await searchKakao(keyword);

    // 2차: 결과 없으면 첫 단어만으로 재검색
    if (!place) {
        const shortKeyword = keyword.split(' ')[0];
        place = await searchKakao(shortKeyword);
    }

    if (!place) return null;
    return {
        sido: place.address_name.split(' ')[0],
        address: place.address_name,
        lat: place.y,
        lng: place.x,
    };
}

async function searchKakao(keyword: string) {
    const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
        { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}` } }
    );
    const data = await res.json();
    return data.documents?.[0] ?? null;
}
