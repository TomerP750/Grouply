import { Faq } from "./Faq";

import { Features } from "./features/Features";

import { Hero } from "./Hero";

export function Home() {
    return (
        <main className="relative dark:bg-gradient-to-bl dark:from-indigo-950 dark:via-slate-900 dark:to-indigo-900 bg-[#FFFFFF] text-black dark:text-white ">
            {/* <Navbar/> */}
            <Hero />
            <Features />
            <div className="flex w-full justify-center">
            <hr className="border-[1px] solid border-gray-600 w-4/5" />
            </div>
            <Faq />
        </main>
    )
}