import { Features } from "./Features";
import { Hero } from "./Hero";

export function Home() {
    return (
        <main className="bg-slate-800">
            {/* <Navbar/> */}
            <Hero/>
            <Features/>
        </main>
    )
}