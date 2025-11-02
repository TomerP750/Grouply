import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { TechnologyDTO } from "../../../../dtos/models_dtos/TechnologyDTO";
import technologyService from "../../../../service/technology_service";
import { Accordion } from "../../../elements/Accordion"
import { toNormal } from "../../../../util/util_functions";
import { useFilters } from "../../../../context/filter_context";


export function TechnologySelect() {

    const [technologes, setTechnologies] = useState<TechnologyDTO[]>([]);

    const { addTech, removeTech, technologies } = useFilters();
    
    const isSelected = (tech: TechnologyDTO) => {
        return technologes.includes(tech);
    } 

    const toggle = (tech: TechnologyDTO) => {
        if (isSelected(tech)) removeTech(tech);
        else addTech(tech);
    }

    useEffect(() => {
        technologyService.allTechnologies()
            .then(res => {
                setTechnologies(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    return (
        <Accordion title="Technologies">
            
            <label className="role-select py-2 flex flex-col items-center h-62 overflow-y-auto gap-3 text-sm">
                {technologes?.map(t => {
                    return <div
                        key={t.id}
                        onClick={() => toggle(t)}
                        className="cursor-pointer py-2 
                                border border-black dark:border-white/40 w-4/5 text-center">{toNormal(t.name)}</div>
                })}
            </label>
            
        </Accordion>
    )
}