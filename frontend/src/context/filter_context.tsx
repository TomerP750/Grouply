import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { ProjectPosition } from "../dtos/enums/ProjectPosition"
import type { TechnologyDTO } from "../dtos/models_dtos/TechnologyDTO";


const FILTER_ROLES = "filter_roles";
const FILTER_TECHNOLOGIES = "filter_technologies";

type FilterState = {
    selectedRoles: ProjectPosition[],
    selectedTechnologies: TechnologyDTO[],
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
    const stored = localStorage.getItem(FILTER_TECHNOLOGIES);
    return stored ? JSON.parse(stored) as TechnologyDTO[] : [];
}

export function FilterProvider({ children }: FilterProviderProps) {

    const [selectedRoles, setSelectedRoles] = useState<ProjectPosition[]>(getInitialRoles);
    const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyDTO[]>(getInitialTechs);

    useEffect(() => {
        localStorage.setItem(FILTER_ROLES, JSON.stringify(selectedRoles));
        localStorage.setItem(FILTER_TECHNOLOGIES, JSON.stringify(selectedTechnologies));
        setEmpty(selectedRoles.length === 0 && selectedTechnologies.length === 0);
    }, [selectedRoles, selectedTechnologies]);

    const [empty, setEmpty] = useState<boolean>(selectedRoles.length === 0 && selectedTechnologies.length === 0);

    const addRole = (role: ProjectPosition) => {
        setSelectedRoles(prev => (prev.includes(role) ? prev : [...prev, role]));
    };

    const removeRole = (role: ProjectPosition) => {
        setSelectedRoles(prev => prev.filter(r => r !== role));
    };

    const addTech = (tech: TechnologyDTO) => {
        setSelectedTechnologies(prev =>
            prev.some(t => t.id === tech.id) ? prev : [...prev, tech]
        );
    };

    const removeTech = (tech: TechnologyDTO) => {
        setSelectedTechnologies(prev => prev.filter(t => t.id !== tech.id));
    };


    const clear = () => {
        setSelectedRoles([]);
        setSelectedTechnologies([]);
        localStorage.removeItem(FILTER_ROLES);
        localStorage.removeItem(FILTER_TECHNOLOGIES);
        setEmpty(true);
    };

    const ctx: FilterContextValues = { selectedRoles, selectedTechnologies, empty, addRole, removeRole, addTech, removeTech, clear };

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