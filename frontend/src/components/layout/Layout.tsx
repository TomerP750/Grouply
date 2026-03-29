import { DmProvider } from "../../context/Dm_context";
import { useUserSelector } from "../../redux/hooks";
import { DirectMessagesDock } from "../direct.messages/pages/dm.dock";
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

    return (

        <div className="">
            <DmProvider>
                <Navbar />
                <BottomNav />
                <DirectMessagesDock />
                <Routing />
                <Footer />
            </DmProvider>
        </div>
    )
}