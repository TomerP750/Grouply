import { useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DashboardPanel } from "./DashboardPanel";
import { useUserSelector } from "../../../shared/store/hooks";
import userService from "../../other-pages/settings/api/userService";
import { DashboardNavbar } from "./DashboardNavbar";


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
        <main aria-label="dashboard" className="min-h-screen flex flex-col dark:bg-stone-900">

            <DashboardNavbar user={user} />
            <DashboardPanel />

        </main>
    )
}