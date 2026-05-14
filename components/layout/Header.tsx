import Image from "next/image";
import Link from "next/link";


export const Header = () => {
    return (
        <header className="w-full px-8 py-4 grid grid-cols-3 items-center">
            <div></div>

            <Link href="/" className="flex flex-col items-center gap-1">
                <Image
                    src='/logo.png'
                    width={80}
                    height={40}
                    loading="eager"
                    alt='로고'
                />
                <span className="text-sm tracking-widest text-gray-800 hover:text-gray-400 transition">exhibition</span>
            </Link>

            <div className="flex justify-end">
                <Link href="/login"
                    className="text-sm font-medium px-2 py-2 hover:text-gray-400 transition">
                    로그인
                </Link>
            </div>
        </header>
    );
};


