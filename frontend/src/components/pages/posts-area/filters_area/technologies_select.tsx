import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { TechnologyDTO } from "../../../../dtos/models_dtos/TechnologyDTO";
import technologyService from "../../../../service/technology_service";
import { Accordion } from "../../../elements/Accordion"
import { toNormal } from "../../../../util/util_functions";


export function TechnologySelect() {

    const [technologes, setTechnologies] = useState<TechnologyDTO[]>([]);

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
            

            <label className="role-select py-2 flex flex-col items-center h-40 overflow-y-auto gap-3 text-sm">
                {technologes?.map(t => {
                    return <div
                        
                        className="cursor-pointer py-2 
                                border border-white/40 w-4/5 text-center">{toNormal(t.name)}</div>
                })}
            </label>
        </Accordion>
    )
}