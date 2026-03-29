import { Route, Routes } from "react-router-dom";
import { useUserSelector } from "../../redux/hooks";
import About from "../features/about/About";
import { ArchivedPostsFeed } from "../features/archived_posts-area/archived_posts_feed";
import { SignUpWizard } from "../features/authentication/signup-wizard/SignUpWizard";
import { Login } from "../features/authentication/pages/login";
import { Dashboard } from "../features/dashboard/dashboard_index/dashboard";
import { Overview } from "../features/dashboard/dashboard_index/dashboard_index";
import { TechnologiesTable } from "../features/dashboard/tables/admin_tables/technologies_table";
import { UsersTable } from "../features/dashboard/tables/admin_tables/users-tabel";
import { JoinRequestsTable } from "../features/dashboard/tables/user_tables/join_requests_table";
import { PostsTable } from "../features/dashboard/tables/user_tables/posts_table";
import { ProjectMembersTable } from "../features/dashboard/tables/user_tables/project_members_table";
import { ProjectsTable } from "../features/dashboard/tables/user_tables/projects-tables";
import { Home } from "../features/home/Home";
import { NotFoundPage } from "../features/other-pages/not-found/not.found.page";
import { DisplaySettings } from "../features/other-pages/settings/pages/display_settings";
import { SecuritySettings } from "../features/other-pages/settings/pages/security_settings";
import { SettingsPage } from "../features/other-pages/settings/pages/SettingsPage";
import { UserSettings } from "../features/other-pages/settings/pages/user_settings_area/user_settings";
import { Feed } from "../features/posts-area/feed/pages/feed";
import FeedPage from "../features/posts-area/feed/pages/feed_page";
import { CreatePostForm } from "../features/posts-area/forms/create_post_form";
import { PostPage } from "../features/posts-area/project_info_page/post_page";
import { ProfilePage } from "../features/profile/pages/profile_page";
import { ReviewProjectPage } from "../features/review_project/pages/review_project_page";




export function Routing() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <FeedPage /> : <Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpWizard />} />
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