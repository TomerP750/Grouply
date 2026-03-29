import { BiSearch, BiSolidSend } from "react-icons/bi";

export function DirectMessageHistoryHeader() {

    const handleCreateChatRoom = () => {

    };

    return (
        <section className="flex items-center gap-3 py-3">

            {/* Search */}
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm
                    focus-within:ring-1 focus-within:ring-white/30
                      dark:border-slate-700 dark:bg-stone-800 dark:text-slate-100">
                <BiSearch className="text-slate-400 dark:text-white/50" size={18} />
                <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-transparent text-sm text-white/90 placeholder:text-black/50
                     focus:outline-none dark:text-slate-100 dark:placeholder:text-white/50"
                />
            </div>

            {/* New DM Button*/}
            <button
                type="button"
                onClick={handleCreateChatRoom}
                className=" inline-flex items-center justify-center cursor-pointer h-10 w-10
                rounded-full
                bg-sky-500
              text-white shadow-md
                hover:brightness-110 hover:shadow-lg
                active:scale-95
                transition-all duration-150"
            >
                <BiSolidSend className="-rotate-45 text-lg" />
            </button>

        </section>
    );
}
