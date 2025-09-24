import { NavLink } from "react-router-dom";


export function FooterTop() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Column 1 */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Product
                </h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                    <li><NavLink to="#" className="hover:text-indigo-300">Features</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">How it Works</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">Pricing</NavLink></li>
                </ul>
            </div>

            {/* Column 2 */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Resources
                </h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                    <li><NavLink to="#" className="hover:text-indigo-300">Docs</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">Blog</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">FAQ</NavLink></li>
                </ul>
            </div>

            {/* Column 3 */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Company
                </h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                    <li><NavLink to="#" className="hover:text-indigo-300">About</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">Careers</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">Contact</NavLink></li>
                </ul>
            </div>

            {/* Column 4 */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Legal
                </h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                    <li><NavLink to="#" className="hover:text-indigo-300">Privacy</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">Terms</NavLink></li>
                    <li><NavLink to="#" className="hover:text-indigo-300">Security</NavLink></li>
                </ul>
            </div>

            {/* Subscribe column */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Subscribe
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                    Get study tips and product updates.
                </p>
                <form className="mt-4 flex flex-col sm:flex-row gap-2">
                    <label htmlFor="footer-email" className="sr-only">Email</label>
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
                           bg-indigo-500 hover:bg-indigo-400 
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    )
}