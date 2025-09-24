import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";
import { Routing } from "./Routing";

export function Layout() {
    return (
        <div className="">
            {/* <Navbar/> */}
            <Routing/>
            <Footer/>
        </div>
    )
}