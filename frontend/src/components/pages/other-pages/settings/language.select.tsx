import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";

const languages = ["en", "he"];

export function LanguageSelect() {
  
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (!lang) return;
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative w-48">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="
          w-full
          appearance-none
          rounded-xl
          border border-slate-300 dark:border-slate-700
          bg-white dark:bg-slate-900
          px-4 py-2 pr-10
          text-sm
          text-slate-800 dark:text-slate-100
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500
          transition-all duration-200
          cursor-pointer
        "
      >
        <option value="">Select Language</option>
        {languages.map((l) => (
          <option key={l} value={l}>
            {l === "en" ? "English" : "עברית"}
          </option>
        ))}
      </select>

      {/* custom arrow */}
      <span
        className="
          pointer-events-none
          absolute inset-y-0 right-3
          flex items-center
          text-slate-400 dark:text-slate-500
        "
      >
        <BiChevronDown size={20}/>
      </span>
    </div>
  );
}
