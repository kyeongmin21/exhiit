import KakaoMap from "@/components/map/KakaoMap";
import ExhibitionList from "../components/layout/ExhibitionList";


export default function Home() {
    return (
        <div>
            <main>
                <ExhibitionList/>
                <KakaoMap/>
            </main>
        </div>
    );
}
