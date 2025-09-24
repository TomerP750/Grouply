import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { About } from "../pages/home/About";
import { NotFound } from "../pages/NotFound";

export function Routing() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>





                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}