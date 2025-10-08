import { useEffect } from "react";
import { useUserSelector } from "../../../redux/hooks"
import userService from "../../../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../layout/navbar/Navbar";
import { Panel } from "./panel";
import { DashboardNavbar } from "./dashboard-navbar";


export function Dashboard() {

    const user = useUserSelector(state => state.authSlice.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            userService.getOneUser(user.id)
                .then(res => {
                    if (user.id !== res.id) {
                        navigate("/");
                    }
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        } else {
            navigate("/");
        }

    }, [])

    return (
        <main aria-label="dashboard" className="min-h-screen flex flex-col bg-gray-100 dark:text-gray-300 dark:bg-slate-900">

            <DashboardNavbar user={user} />
            <Panel />




        </main>
    )
}