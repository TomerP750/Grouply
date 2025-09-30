import { Footer } from "./footer/Footer";
import { BottomNav } from "./navbar/BottomNav";
import { Navbar } from "./navbar/Navbar";
import { Routing } from "./Routing";

export function Layout() {
    return (
        <div className="">
            {/* <Navbar/> */}
            <BottomNav/>
            <Routing/>
            <Footer/>
        </div>
    )
}