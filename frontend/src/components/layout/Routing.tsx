import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { NotFound } from "../pages/other-pages/NotFound";
import About from "../pages/about/About";
import { SignUpWizard } from "../pages/authentication/signup-wizard/SignUpWizard";
import { Feed } from "../pages/posts-area/Feed";
import { ProfilePage } from "../pages/profile/profile_page";
import { useUserSelector } from "../../redux/hooks";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Overview } from "../pages/dashboard/overview";
import { ProjectsTable } from "../pages/dashboard/tables/projects-tables";
import { Role } from "../../dtos/enums/Role";
import { UsersTable } from "../pages/dashboard/tables/users-tabel";
import { PostPage } from "../pages/posts-area/project_info_page/post_page";
import { SettingsPage } from "../pages/other-pages/settings/SettingsPage";
import { UserSettings } from "../pages/other-pages/settings/user_settings";
import { DisplaySettings } from "../pages/other-pages/settings/display_settings";


export function Routing() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <Feed /> : <Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpWizard />} />
                <Route path="/settings" element={<SettingsPage/>}>
                    <Route index element={<UserSettings />} />
                    <Route path="display" element={<DisplaySettings />} />
                </Route>

                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/dashboard/:id" element={<Dashboard />}>
                    <Route index element={<Overview />} />
                    <Route path="projects" element={<ProjectsTable />} />
                    <Route path="users" element={<UsersTable/>} />
                </Route>

                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/feed" element={<Feed />} />



                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}