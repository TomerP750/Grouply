import { FooterBottom } from "./FooterBottom";
import { FooterTop } from "./FooterTop";



export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-stone-900 dark:to-stone-950 border-t border-white/20">
    
      <div className="mx-auto px-6 py-12">
        
        <FooterTop/>
        <hr className="mt-12 border-t border-slate-700" />
        <FooterBottom/>
      </div>

    </footer>
  );
}
