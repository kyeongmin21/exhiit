'use client'

import {formatDate} from '@/utils/date';
import {useExhibitions} from '@/hooks/useExhibitions'
import {ExhibitionItem} from '@/types/exhibitionTypes'
import Image from "next/image";


export default function Home() {
    const {data, isLoading, isError} = useExhibitions()

    if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>
    if (isError) return <div className="p-10 text-center">오류가 발생했어요 ㅜㅜ</div>

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">exhiit</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.items.map((item: ExhibitionItem, index: number) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow hover:shadow-md transition">
                        {item.imageObject ? (
                            <div className='relative w-full h-48'>
                                <Image
                                    fill
                                    priority
                                    src={item.imageObject}
                                    alt={item.title}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">이미지 없음</span>
                            </div>
                        )}
                        <div className="p-3">
                            <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                            <p className="font-semibold text-sm line-clamp-2">{item.period}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.eventSite}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {item.eventPeriod.split('~').map(d => formatDate(d.trim())).join(' ~ ')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
