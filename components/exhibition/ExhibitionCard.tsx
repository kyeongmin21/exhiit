import Image from "next/image";
import {formatDate} from '@/utils/date';
import {ExhibitionItem} from "@/types/exhibitionTypes";


export default function ExhibitionCard({item}: { item: ExhibitionItem }) {
    return (
        <div className="rounded-xl overflow-hidden shadow hover:shadow-md transition">
            <div className='relative w-full h-48'>
                {item.imageObject ? (
                    <Image
                        fill
                        priority
                        src={item.imageObject}
                        alt={item.title}
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">이미지 없음</span>
                    </div>
                )}
            </div>
            <div className="p-3">
                <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                <p className="font-semibold text-sm line-clamp-2">{item.period}</p>
                <p className="text-xs text-gray-500 mt-1">{item.eventSite}</p>
                <p className="text-xs text-gray-400 mt-1">
                    {item.eventPeriod.split('~').map(d => formatDate(d.trim())).join(' ~ ')}
                </p>
            </div>
        </div>
    )
}
