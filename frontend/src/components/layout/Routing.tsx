import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { NotFound } from "../pages/other-pages/NotFound";
import About from "../pages/about/About";
import { SignUpWizard } from "../pages/authentication/signup-wizard/SignUpWizard";
import { SearchProjectsPage } from "../pages/projects-area/SearchProjectsPage";
import { ProfilePage } from "../pages/profile/profile_page";
import { useUserSelector } from "../../redux/hooks";


export function Routing() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <SearchProjectsPage/> : <Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUpWizard/>}/>

                <Route path="/profile/:id" element={<ProfilePage/>}/>

                <Route path="/search-projects" element={<SearchProjectsPage/>}/>



                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}