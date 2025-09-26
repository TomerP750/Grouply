import { Faq } from "./Faq";

import { Features } from "./features/Features";

import { Hero } from "./Hero";

export function Home() {
    return (
        <main className="relative dark:bg-[#0d1117] bg-[#FFFFFF] text-black dark:text-white ">
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