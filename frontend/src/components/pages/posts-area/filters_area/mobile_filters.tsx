import { BiFilter } from "react-icons/bi"

interface MobileFiltersProps {
    
}

export function MobileFilters() {
    return <div className="fixed bottom-22 left-5 lg:hidden">
        <button className="inline-flex gap-1 items-center rounded-full p-4 bg-sky-500 hover:bg-sky-600 hover:scale-110 transition-all duration-200 cursor-pointer text-white">
            <BiFilter size={25}/>
        </button>
    </div>
}