import KakaoMap from "@/components/map/KakaoMap";
import ExhibitionList from "../components/exhibition/ExhibitionList";


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
