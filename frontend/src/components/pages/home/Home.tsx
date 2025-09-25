import { Faq } from "../Faq";
import { Features } from "./features/Features";

import { Hero } from "./Hero";

export function Home() {
    return (
        <main className="bg-slate-800">
            {/* <Navbar/> */}
            <Hero/>
            <Features/>
            <Faq/>
        </main>
    )
}