import { NavLink } from "react-router-dom";
import { FaUsers, FaSearch, FaFilter, FaComments, FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { AboutHeader } from "./AboutHeader";
import { AboutWhatIs } from "./About_What_Is";
import { AboutHowItWorks } from "./About_How_It_Works";
import { AboutFaq } from "./About_Faq";
import { AboutCta } from "./About_Cta";

export default function About() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">

            <AboutHeader/>
        
            <AboutWhatIs/>
                    
            <AboutHowItWorks/>

            <AboutFaq/>

            <AboutCta/>
            
        </div>
    );
}
