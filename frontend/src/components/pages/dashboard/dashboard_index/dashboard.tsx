import { useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Panel } from "./panel";
import { DashboardNavbar } from "./dashboard-navbar";
import { useUserSelector } from "../../../../redux/hooks";
import userService from "../../../../service/user_service";


export function Dashboard() {

    const user = useUserSelector(state => state.authSlice.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            userService.getOneUser(user.sub)
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
        <main aria-label="dashboard" className="min-h-screen flex flex-col">

            <DashboardNavbar user={user} />
            <Panel />




        </main>
    )
}