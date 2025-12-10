import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";

import { useUserSelector } from "../../redux/hooks";
import About from "../pages/about/About";
import { RecruiterSignUp } from "../pages/authentication/recruiter-auth/recruiter_signup";
import { SignUpWizard } from "../pages/authentication/signup-wizard/SignUpWizard";
import { Login } from "../pages/authentication/user_auth/Login";

import { ProjectMembersTable } from "../pages/dashboard/tables/user_tables/project_members_table";
import { ProjectsTable } from "../pages/dashboard/tables/user_tables/projects-tables";
import { DisplaySettings } from "../pages/other-pages/settings/display_settings";
import { SecuritySettings } from "../pages/other-pages/settings/security_settings";
import { SettingsPage } from "../pages/other-pages/settings/SettingsPage";
import { UserSettings } from "../pages/other-pages/settings/user_settings_area/user_settings";
import { Feed } from "../pages/posts-area/feed";
import { PostPage } from "../pages/posts-area/project_info_page/post_page";
import { ProfilePage } from "../pages/profile/pages/profile_page";
import { RecruiterLogin } from "../pages/authentication/recruiter-auth/recruiter_login";
import { ArchivedPostsFeed } from "../pages/archived_posts-area/archived_posts_feed";
import { UsersTable } from "../pages/dashboard/tables/admin_tables/users-tabel";
import { TechnologiesTable } from "../pages/dashboard/tables/admin_tables/technologies_table";
import FeedPage from "../pages/posts-area/feed_page";
import { ReviewProjectPage } from "../pages/review_project/pages/review_project_page";
import { PostsTable } from "../pages/dashboard/tables/user_tables/posts_table";
import { JoinRequestsTable } from "../pages/dashboard/tables/user_tables/join_requests_table";
import { Dashboard } from "../pages/dashboard/dashboard_index/dashboard";
import { Overview } from "../pages/dashboard/dashboard_index/dashboard_index";
import { CreatePostForm } from "../pages/posts-area/forms/create_post_form";
import { NotFoundPage } from "../pages/other-pages/not.found.page";



export function Routing() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <FeedPage /> : <Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpWizard />} />
                <Route path="/recruiter/signup" element={<RecruiterSignUp />} />
                <Route path="/recruiter/login" element={<RecruiterLogin />} />
                <Route path="/settings" element={<SettingsPage />}>
                    <Route index element={<UserSettings />} />
                    <Route path="display" element={<DisplaySettings />} />
                    <Route path="security" element={<SecuritySettings />} />
                </Route>

                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/dashboard/:id" element={<Dashboard />}>
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
                <Route path="review-project" element={<ReviewProjectPage />} />



                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}