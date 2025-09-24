import { FooterBottom } from "./FooterBottom";
import { FooterTop } from "./FooterItems";



export function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
    
      <div className="mx-auto px-6 py-12">
        
        <FooterTop/>
        <hr className="mt-12 border-t border-slate-700" />
        <FooterBottom/>
      </div>

    </footer>
  );
}
