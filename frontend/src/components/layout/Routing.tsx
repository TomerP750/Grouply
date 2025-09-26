import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { NotFound } from "../pages/NotFound";
import { SignUp } from "../pages/authentication/Signup";
import About from "../pages/about/About";


export function Routing() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>



                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}