import { useUserSelector } from "../../redux/hooks";
import { DirectMessagesDock } from "../direct.messages/pages/dm.dock";
import { Footer } from "./footer/Footer";
import { BottomNav } from "./navbar/BottomNav";
import { Routing } from "./routing";


export function Layout() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div className="">
            {/* <Navbar/> */}
            <BottomNav/>
            {user && <DirectMessagesDock/>}
            <Routing/>
            <Footer/>
        </div>
    )
}