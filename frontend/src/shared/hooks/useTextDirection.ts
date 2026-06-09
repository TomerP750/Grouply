import { useEffect } from "react";
import i18n from "../i18n";


export function useTextDirection() {
    useEffect(() => {
        document.documentElement.dir = i18n.language === "he" ? "rtl" : "ltr";
    }, [i18n.language]);
}