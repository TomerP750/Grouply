import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { TechnologyDTO } from "../../../../dtos/models_dtos/TechnologyDTO";
import technologyService from "../../../../service/technology_service";
import { Accordion } from "../../../elements/Accordion"


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
            <label className="flex flex-col gap-1 text-sm">

                <select
                    className="rounded-md border border-slate-300 dark:border-slate-600 overflow-y-auto
                             bg-white dark:bg-slate-700 px-3 py-2 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Any Technology</option>
                    {technologes?.map(t => {
                        return <option value={t.id} key={t.id}>{t.name}</option>
                    })}
                </select>
            </label>
        </Accordion>
    )
}