import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { NotFound } from "../pages/other-pages/NotFound";
import About from "../pages/about/About";
import { SignUpWizard } from "../pages/authentication/signup-wizard/SignUpWizard";
import { SearchProjectsPage } from "../pages/posts-area/SearchProjectsPage";
import { ProfilePage } from "../pages/profile/profile_page";
import { useUserSelector } from "../../redux/hooks";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Overview } from "../pages/dashboard/overview";
import { ProjectsTable } from "../pages/dashboard/tables/projects-tables";
import { Role } from "../../dtos/enums/Role";
import { UsersTable } from "../pages/dashboard/tables/users-tabel";
import { PostPage } from "../pages/posts-area/project_info_page/post_page";


export function Routing() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <SearchProjectsPage /> : <Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpWizard />} />

                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/dashboard/:id" element={<Dashboard />}>
                    <Route index element={<Overview />} />
                    <Route path="projects" element={<ProjectsTable />} />
                    <Route path="users" element={<UsersTable/>} />
                </Route>

                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/search-projects" element={<SearchProjectsPage />} />



                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}