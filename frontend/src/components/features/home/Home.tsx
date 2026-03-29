import { Features } from "./features/Features";

import { Hero } from "./Hero";
import { RecruiterFeatures } from "./recruiter_featuers/recruiter_features";

export function Home() {
    return (
        <main className="relative  bg-gradient-to-b from-blue-50 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-teal-900 dark:to-gray-950
 text-black dark:text-white ">
            
            <Hero />
            {/* <Features />
            <RecruiterFeatures/> */}
            
           
        </main>
    )
}