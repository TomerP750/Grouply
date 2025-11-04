import { useState } from "react";
import { Navbar } from "../../layout/navbar/Navbar";


export function ReviewProjectPage() {

    const [selectedUrl, setSelectedUrl] = useState<string>('');
    const hasUrl = selectedUrl ? true : false;



    const handleReview = () => {

    }

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            <section className="flex flex-col items-center justify-center h-60 dark:text-white gap-3">
                <div className="w-full flex flex-col items-center gap-2">
                    <div className="flex justify-between items-center w-1/2">
                        <span></span>
                        <h1>Review Your Projects</h1>
                        <button>Reset</button>
                    </div>
                    <input type="url" className="bg-slate-700 py-2 px-3 rounded-full w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                {hasUrl && <button className="cursor-pointer bg-teal-600 hover:bg-teal-500 transition-colors duration-200 rounded-full px-3 py-2 w-25">Review</button>}
            </section>

            <section className="flex flex-col w-full items-center dark:text-white">
                <h2>Choose A Project</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3">

                </div>
            </section>
        </div>
    )
}