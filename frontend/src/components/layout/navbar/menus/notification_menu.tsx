import { BiBellMinus, BiChat, BiGroup } from "react-icons/bi";
import { Menu } from "../../../elements/Menu";



export function NotificationMenu() {

    return (
        <Menu>
            <div className=" gap-5 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 flex flex-col justify-center items-start py-5 px-4 absolute top-0 mt-15 -right-2 w-95 max-w-95 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">
                <menu className="w-full flex flex-col items-center">

                    <BiBellMinus size={40} />
                    <p className="text-sm text-center">No New Notifications</p>

                </menu>

            </div>
        </Menu>
    )
}