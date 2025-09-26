import { footerItems } from "./FooterData";
import { FooterItem } from "./FooterItem";


export type FooterItem = {
    title: string
    link1: string
    link2: string
    link3: string
}

export function FooterTop() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {footerItems.map(f => <FooterItem key={f.title} footerItem={f}/>)}

            {/* Subscribe column */}
            {/* <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide ">
                    Subscribe
                </h3>
                <p className="mt-2 text-sm">
                    Get study tips and product updates.
                </p>
                <form className="mt-4 flex flex-col sm:flex-row gap-2">

                    <input
                        id="footer-email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl bg-slate-700 px-3 py-2 text-sm 
                           placeholder:text-slate-400 focus:outline-none 
                           focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="rounded-xl px-4 py-2 text-sm font-medium 
                           bg-indigo-500 hover:bg-indigo-400 cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
                    >
                        Subscribe
                    </button>

                </form>
            </div> */}
        </div>
    )
}