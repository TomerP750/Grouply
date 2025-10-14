import { useEffect } from "react";


export function useScrollToTop() {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "auto"})
    }, []);
}


import { useRef, useState } from "react";

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

