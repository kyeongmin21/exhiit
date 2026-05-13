import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Providers from './providers'
import KakaoMapScript from "@/components/map/KakaoMapScript";
import "./globals.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "전시 큐레이팅",
    description: "지금 놓치면 안 될 전시를 한눈에. 국내 전시 정보를 큐레이팅합니다.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <KakaoMapScript/>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
