import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { NotFound } from "../pages/NotFound";
import About from "../pages/about/About";
import { SignUpWizard } from "../pages/authentication/signup-wizard/SignupWizard";


export function Routing() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUpWizard/>}/>



                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}