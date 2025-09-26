import { Navbar } from "../../layout/navbar/Navbar";
import { AboutHeader } from "./AboutHeader";
import { AboutCta } from "./About_Cta";
import { AboutFaq } from "./About_Faq";
import { AboutHowItWorks } from "./About_How_It_Works";
import { AboutWhatIs } from "./About_What_Is";

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
