import Main from '@/components/layout/Main'
import KakaoMap from "@/components/map/KakaoMap";


export default function Home() {
    return (
        <div>
            <main>
                <KakaoMap/>
                <Main/>
            </main>
        </div>
    );
}
