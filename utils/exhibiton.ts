export const extractId = (url: string) => {
    return new URL(url).searchParams.get('pSeq') // "69308"
}
