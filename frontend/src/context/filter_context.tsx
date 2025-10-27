import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { ProjectPosition } from "../dtos/enums/ProjectPosition"
import type { TechnologyDTO } from "../dtos/models_dtos/TechnologyDTO";


const FILTER_ROLES = "filter_roles";
const FILTER_TECHNOLOGIES = "filter_technologies";

type FilterState = {
    roles: ProjectPosition[],
    technologies: TechnologyDTO[],
    empty: boolean,
}

type FilterContextValues = FilterState & {
    addRole: (role: ProjectPosition) => void;
    removeRole: (role: ProjectPosition) => void;
    addTech: (tech: TechnologyDTO) => void;
    removeTech: (tech: TechnologyDTO) => void;
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

const getInitialTechs = () => {
    const stored = localStorage.getItem(FILTER_ROLES);
    return stored ? JSON.parse(stored) as TechnologyDTO[] : [];
}

export function FilterProvider({ children }: FilterProviderProps) {

    const [roles, setRoles] = useState<ProjectPosition[]>(getInitialRoles);
    const [technologies, setTechnolgies] = useState<TechnologyDTO[]>(getInitialTechs);

    useEffect(() => {
        localStorage.setItem(FILTER_ROLES, JSON.stringify(roles));
        localStorage.setItem(FILTER_TECHNOLOGIES, JSON.stringify(technologies));
        setEmpty(roles.length === 0 && technologies.length === 0);
    }, [roles, technologies]);

    const [empty, setEmpty] = useState<boolean>(roles.length === 0);

    const addRole = (role: ProjectPosition) => {
        setRoles(prev => (prev.includes(role) ? prev : [...prev, role]));
    };

    const removeRole = (role: ProjectPosition) => {
        setRoles(prev => prev.filter(r => r !== role));
    };

    const addTech = (tech: TechnologyDTO) => {
        setTechnolgies(prev => (prev.includes(tech) ? prev : [...prev, tech]));
    };

    const removeTech = (tech: TechnologyDTO) => {
        setTechnolgies(prev => prev.filter(t => t !== tech));
    };

    const clear = () => {
        setRoles([]);
        localStorage.removeItem(FILTER_ROLES)
        setEmpty(true);
    };

    const ctx: FilterContextValues = { roles, technologies, empty, addRole, removeRole, addTech, removeTech ,clear };

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