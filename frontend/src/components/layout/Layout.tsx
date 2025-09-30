import { useUserSelector } from "../../redux/hooks";
import { Footer } from "./footer/Footer";
import { MessageBox } from "./message-box/message_box";
import { BottomNav } from "./navbar/BottomNav";
import { Navbar } from "./navbar/Navbar";
import { Routing } from "./Routing";

export function Layout() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div className="">
            {/* <Navbar/> */}
            <BottomNav/>
            {user && <MessageBox/>}
            <Routing/>
            <Footer/>
        </div>
    )
}