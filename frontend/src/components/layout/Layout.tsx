import { DmProvider } from "../../context/Dm_context";
import { useUserSelector } from "../../redux/hooks";
import { DirectMessagesDock } from "../direct.messages/pages/dm.dock";
import { Footer } from "./footer/Footer";
import { BottomNav } from "./navbar/BottomNav";
import { Routing } from "./routing";


export function Layout() {

    const user = useUserSelector(state => state.authSlice.user);

    if (!user) {
        return (
            <div>
                <BottomNav />
                <Routing />
                <Footer />
            </div>
        )
    }

    return (

        <div className="">
            <DmProvider>
                <BottomNav />
                <DirectMessagesDock />
                <Routing />
                <Footer />
            </DmProvider>
        </div>
    )
}