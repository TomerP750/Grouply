import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import technologyService from "../../../../shared/api/technologyService";
import type { TechnologyDTO } from "../../../../shared/models/TechnologyDto";
import { ProjectPosition } from "../../../../shared/models/project/ProjectPosition";
import { Button } from "../../../../shared/ui/Button";
import { useSearchParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";


export function Filters() {

    const [filtersOpen, setFiltersOpen] = useState<boolean>(true);
    const [rolesOpen, setRolesOpen] = useState<boolean>(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const positions = searchParams.get("positions")?.split(",") || [];
    const sort = searchParams.get("sort") || "newest-oldest";

    // const { data } = useQuery({
    //     queryKey: ["tech"],
    //     queryFn: () => technologyService.allTechnologies(),
    // });

    const resetFilters = () => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            params.delete("positions");

            return params;
        });
    };

    const togglePosition = (position: ProjectPosition) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            const activePositions =
                params.get("positions")?.split(",") || [];

            const nextPositions = activePositions.includes(position)
                ? activePositions.filter(p => p !== position)
                : [...activePositions, position];

            if (nextPositions.length === 0) {
                params.delete("positions");
            } else {
                params.set("positions", nextPositions.join(","));
            }

            return params;
        });
    };

    return (
        <aside className="w-100 min-h-screen border-r border-white text-white px-5">

            <button className="mb-2 cursor-pointer" onClick={resetFilters}>Reset</button>
            <button
                className="cursor-pointer w-full flex items-center justify-between gap-2 mb-5 text-white"
                onClick={() => setFiltersOpen(prev => !prev)}
            >
                <span>Filters</span>
                <FiFilter />
            </button>

            {filtersOpen && <div>

                {/* Sort Filter */}
                <section className="flex flex-col items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sort"
                            value="newest-oldest"
                        />
                        Newest - Oldest
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sort"
                            value="oldest-newest"
                        />
                        Oldest - Newest
                    </label>
                </section>

                {/* Technology Filter */}
                <button onClick={() => setRolesOpen(prev => !prev)} className="text-left mb-2 w-full cursor-pointer">Technologies</button>
                <section className="flex flex-col items-center">
                    {/* {technologies && technologies.map(t => {
                        return <button key={t.id}>{t.name}</button>
                    })} */}
                </section>

                {/* Role Filter */}
                <button
                    onClick={() => setRolesOpen(prev => !prev)}
                    className="flex items-center justify-between text-left mb-2 w-full cursor-pointer">
                    <span>Role</span>
                    <FaChevronDown size={15} className={`${rolesOpen ? '' : 'rotate-180'}`} />
                </button>
                {rolesOpen && (
                    <section className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2">
                        {Object.values(ProjectPosition).map((pp) => {
                            const isActive = positions.includes(pp);

                            return (
                                <button
                                    key={pp}
                                    onClick={() => togglePosition(pp)}
                                    className={`w-full text-center border px-3 py-2  transition ${isActive
                                        ? "bg-cyan-800 text-white"
                                        : "hover:bg-slate-800"
                                        }`}
                                >
                                    {pp}
                                </button>
                            );
                        })}
                    </section>
                )}

            </div>}

        </aside>
    )
}