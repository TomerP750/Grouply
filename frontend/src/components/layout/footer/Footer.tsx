import { FooterBottom } from "./FooterBottom";
import { FooterTop } from "./FooterTop";



export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 via-indigo-100 to-gray-100 dark:from-slate-900 dark:via-teal-950 dark:to-stone-900">
    
      <div className="mx-auto px-6 py-12">
        
        <FooterTop/>
        <hr className="mt-12 border-t border-slate-700" />
        <FooterBottom/>
      </div>

    </footer>
  );
}
