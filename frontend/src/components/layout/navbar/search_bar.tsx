import { useEffect } from "react";

interface SearchBarProps {
  open: boolean;
  onClose: () => void; // NEW
}

export function SearchBar({ open, onClose }: SearchBarProps) {
  

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop Wrapper */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-30
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      />

      {/* search bar */}
      <div
        className={`
          fixed top-0 left-0 w-full h-50 flex items-center px-10  
          z-40
          bg-gray-800/95 backdrop-blur border-b border-white/10
          transition-transform duration-300 ease-out will-change-transform
          ${open ? "translate-y-0" : "-translate-y-full"}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Input bar */}

        <div className="w-full">
          <label>Search Users</label>
          <input type="text" className="block rounded-lg bg-slate-900 w-4/5 p-2 focus:outline-none focus:ring focus:ring-teal-500" />
        </div>
        
      </div>
    </>
  );
}
