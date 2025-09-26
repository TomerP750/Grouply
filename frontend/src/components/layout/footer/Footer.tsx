import { FooterBottom } from "./FooterBottom";
import { FooterTop } from "./FooterTop";



export function Footer() {
  return (
    <footer className="bg-gray-400 dark:bg-[#080909] dark:text-white">
    
      <div className="mx-auto px-6 py-12">
        
        <FooterTop/>
        <hr className="mt-12 border-t border-slate-700" />
        <FooterBottom/>
      </div>

    </footer>
  );
}
