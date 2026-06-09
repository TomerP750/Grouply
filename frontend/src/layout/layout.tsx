import { useUserSelector } from "../../shared/store/hooks";
import { Footer } from "./footer/Footer";
import { BottomNav } from "./navbar/pages/BottomNav";
import { Navbar } from "./navbar/pages/Navbar";
import { Routing } from "./routing";


export function Layout() {

    const user = useUserSelector(state => state.authSlice.user);

    if (!user) {
        return (
            <div>
                <Navbar />
                <BottomNav />
                <Routing />
                <Footer />
            </div>
        )
    }


}