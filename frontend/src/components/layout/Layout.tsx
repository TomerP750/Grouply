import { Footer } from "./Footer";
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