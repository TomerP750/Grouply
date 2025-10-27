import { useEffect } from "react";


export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, []);
}


import { useRef, useState } from "react";
import { useUser } from "../redux/hooks";
import { Role } from "../dtos/enums/Role";

export function useThrottleClick(delay = 1000) {
  const lastClick = useRef(0);
  const [cooling, setCooling] = useState(false);

  const run = (fn: () => void) => {
    const now = Date.now();
    if (now - lastClick.current < delay || cooling) return;

    lastClick.current = now;
    setCooling(true);
    fn();

    setTimeout(() => setCooling(false), delay);
  };

  return { run, cooling };
}


export function useRecruiterRole() {
  const user = useUser();
  return user.role === Role.RECRUITER;
}


export function useBodyScrollLock(open: boolean) {
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

}