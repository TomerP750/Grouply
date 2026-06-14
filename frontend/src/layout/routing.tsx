import { Route, Routes } from "react-router-dom";
import { Login } from "../features/authentication/pages/Login";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { Overview } from "../features/dashboard/dashboard_index/DashboardIndex";
import { UsersTable } from "../features/dashboard/tables/admin_tables/users_table/UsersTable";

import { CreatePostForm } from "../features/feed/posts/forms/CreatePostForm";
import { PostPage } from "../features/feed/posts/pages/PostPage";
import { Home } from "../features/home/pages/Home";
import { NotFoundPage } from "../features/other-pages/not-found/NotFoundPage";
import { DisplaySettings } from "../features/other-pages/settings/pages/DisplaySettings";
import { SecuritySettings } from "../features/other-pages/settings/pages/SecuritySettings";
import { UserSettings } from "../features/other-pages/settings/pages/user_settings/UserSettings";
import { useUserSelector } from "../shared/store/hooks";
import { ArchivedPostsFeed } from "../features/feed/archived_posts/pages/ArchivedPostsFeed";
import { SignUp } from "../features/authentication/pages/SignUp";
import { Feed } from "../features/feed/posts/pages/Feed";
import { TechnologiesTable } from "../features/dashboard/tables/admin_tables/technology_table/TechnologiesTable";
import { JoinRequestsTable } from "../features/dashboard/tables/user_tables/join_requests_table/JoinRequestsTable";
import { PostsTable } from "../features/dashboard/tables/user_tables/posts_table/PostsTable";
import { ProjectMembersTable } from "../features/dashboard/tables/user_tables/project_members_table/ProjectMembersTable";
import { ProjectsTable } from "../features/dashboard/tables/user_tables/projects_table/pages/ProjectsTable";
import { SettingsPage } from "../features/other-pages/settings/pages/layout/SettingsPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";





export function Routing() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <Feed /> : <Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/settings" element={<SettingsPage />}>
                    <Route index element={<UserSettings />} />
                    <Route path="display" element={<DisplaySettings />} />
                    <Route path="security" element={<SecuritySettings />} />
                </Route>

                <Route path="/profile/:id" element={<ProfilePage />} />
                
                <Route path="/dashboard/:id" element={<DashboardPage />}>
                    <Route index element={<Overview />} />
                    <Route path="projects" element={<ProjectsTable />} />
                    {/* <Route path="posts" element={<PostsTable />} /> */}
                    <Route path="requests/:postId" element={<JoinRequestsTable />} />
                    <Route path="project-members/:id" element={<ProjectMembersTable />} />
                    <Route path="posts">
                        <Route index element={<PostsTable />} />
                        <Route path=":postId/requests" element={<JoinRequestsTable />} />
                    </Route>

                    {/* Admin section */}
                    <Route path="manage/users" element={<UsersTable />} />
                    <Route path="manage/technologies" element={<TechnologiesTable />} />
                </Route>

                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/create-post" element={<CreatePostForm/>}/>
                <Route path="/archived" element={<ArchivedPostsFeed />} />


                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}