import { useUserSelector } from "../../redux/hooks";
import { Footer } from "./footer/Footer";
import { MessageDock } from "./message-box/message_dock";
import { BottomNav } from "./navbar/BottomNav";
import { Routing } from "./Routing";

export function Layout() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div className="">
            {/* <Navbar/> */}
            <BottomNav/>
            {user && <MessageDock/>}
            <Routing/>
            <Footer/>
        </div>
    )
}