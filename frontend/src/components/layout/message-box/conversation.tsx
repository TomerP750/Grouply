import { BiChevronLeft } from "react-icons/bi";

type Props = {
  name: string;
  onBack: () => void;
};

export function Conversation({ name, onBack }: Props) {
  return (
    <>
      {/* Header row inside the panel body, under the panel header */}
      <div className="flex items-center gap-2 p-3 border-b dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Back"
        >
          <BiChevronLeft size={22} />
        </button>
        <h4 className="font-medium truncate">{name}</h4>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="self-start max-w-[80%] rounded-2xl px-3 py-2 bg-slate-100 dark:bg-slate-800">
          <p className="text-sm">This is the beginning of your chat.</p>
        </div>
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => { e.preventDefault(); /* send message here */ }}
        className="p-3 border-t dark:border-slate-800"
      >
        <input
          placeholder="Type a message…"
          className="w-full rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </form>
    </>
  );
}
