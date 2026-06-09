import { Footer } from "./footer/Footer";
import { BottomNav } from "./navbar/pages/BottomNav";
import { Navbar } from "./navbar/pages/Navbar";
import { Routing } from "./routing";


export function Layout() {

    return (
        <div>
            <Navbar />
            <BottomNav />
            <Routing />
            <Footer />
        </div>
    )



}