import { useUserSelector } from "../../redux/hooks";
import { DmDockWrapper } from "../direct.messages/pages/dm.dock.wrapper";
import { Footer } from "./footer/Footer";
import { BottomNav } from "./navbar/BottomNav";
import { Routing } from "./routing";


export function Layout() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div className="">
            {/* <Navbar/> */}
            <BottomNav/>
            {user && <DmDockWrapper/>}
            <Routing/>
            <Footer/>
        </div>
    )
}