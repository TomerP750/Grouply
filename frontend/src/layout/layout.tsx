import { BottomNav } from "./navbar/pages/BottomNav";
import { Navbar } from "./navbar/pages/Navbar";
import { Routing } from "./Routing";


export function Layout() {

    return (
        <div>
            <Navbar />
            <BottomNav />
            <Routing />
        </div>
    )



}