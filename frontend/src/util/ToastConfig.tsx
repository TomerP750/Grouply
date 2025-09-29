import { ToastContainer } from "react-toastify";
import { useTheme } from "../context/ThemeContext";


export function ToastConfig() {
    const { theme } = useTheme();
    return (
        <ToastContainer
          position='bottom-left'
          autoClose={3000} 
          theme={theme === "dark" ? "dark" : "light"}
          newestOnTop
        />
    )
}