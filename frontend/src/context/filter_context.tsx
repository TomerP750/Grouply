import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { ProjectPosition } from "../dtos/enums/ProjectPosition"


const FILTER_ROLES = "filter_roles";
const FILTER_TECHNOLOGIES = "filter_technologies";

type FilterState = {
    roles: ProjectPosition[],
    empty: boolean,
}

type FilterContextValues = FilterState & {
    add: (role: ProjectPosition) => void;
    remove: (role: ProjectPosition) => void;
    clear: () => void;
}

const FilterContext = createContext<FilterContextValues | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode
}

const getInitialRoles = () => {
    const stored = localStorage.getItem(FILTER_ROLES);
    return stored ? JSON.parse(stored) as ProjectPosition[] : [];
}

export function FilterProvider({ children }: FilterProviderProps) {

    const [roles, setRoles] = useState<ProjectPosition[]>(getInitialRoles);

    useEffect(() => {
        localStorage.setItem(FILTER_ROLES, JSON.stringify(roles));
        setEmpty(roles.length === 0);
    }, [roles]);

    const [empty, setEmpty] = useState<boolean>(roles.length === 0);

    const add = (role: ProjectPosition) => {
        setRoles(prev => (prev.includes(role) ? prev : [...prev, role]));
    };

    const remove = (role: ProjectPosition) => {
        setRoles(prev => prev.filter(r => r !== role));
    };

    const clear = () => {
        setRoles([]);
        localStorage.removeItem(FILTER_ROLES)
        setEmpty(true);
    };

    const ctx: FilterContextValues = { roles, empty, add, remove, clear };

    return (
        <FilterContext.Provider value={ctx}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilters() {
    const ctx = useContext(FilterContext);
    if (!ctx) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return ctx;
}