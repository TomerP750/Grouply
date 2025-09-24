import { Navbar } from "../../layout/navbar/Navbar";
import heroLight from "../../../assets/heroLight.png";
import heroDark from "../../../assets/heroDark.png";
import { useTheme } from "../../../context/ThemeContext";

export function Hero() {

    const { theme } = useTheme();

     return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${theme === "dark" ? heroDark : heroLight})`,
      }}
    >
      <Navbar />

      <div className="dark:text-white flex-1 flex flex-col items-start justify-center text-center px-10 gap-3">
        <h1 className="text-5xl font-bold">
          Organize study groups with ease.
        </h1>
        <h2 className="text-md max-w-2xl">
          Create sessions, track progress, and keep your peers aligned — all in one place.
        </h2>
        <h2 className="text-md max-w-2xl">
          Share the project, or find open project to join
        </h2>
      </div>
    </div>
  );
}