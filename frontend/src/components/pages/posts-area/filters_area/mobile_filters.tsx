import { BiFilter } from "react-icons/bi"



export function MobileFilters() {
    return <div className="block lg:hidden">
        <button className="inline-flex gap-1 items-center">
            <BiFilter size={22}/>
            <span>Filters</span>
        </button>
    </div>
}