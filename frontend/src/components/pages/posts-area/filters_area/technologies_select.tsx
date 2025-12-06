import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFilters } from "../../../../context/filter_context";
import type { TechnologyDTO } from "../../../../dtos/models_dtos/technology_dto";
import technologyService from "../../../../service/technology_service";
import { technologyIconMap } from "../../../../util/technology_icon_mapper";
import { toNormal } from "../../../../util/util_functions";
import { Accordion } from "../../../elements/Accordion";
import { useTranslation } from "react-i18next";



export function TechnologySelect() {


    const { addTech, removeTech, selectedTechnologies } = useFilters();
    const [techs, setTechs] = useState<TechnologyDTO[]>([]);

    const { t } = useTranslation();

    const isSelected = (tech: TechnologyDTO) => {
        return selectedTechnologies.some(t => t.id === tech.id);
    }

    const toggle = (tech: TechnologyDTO) => {
        isSelected(tech) ? removeTech(tech) : addTech(tech);
    }

    useEffect(() => {
        technologyService.allTechnologies()
            .then(res => {
                setTechs(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);


    return (
        <Accordion title={t("filters.technologies.label")}>

            <label className="tech-select py-2 flex flex-col items-center h-62 overflow-y-scroll gap-3 text-sm">
                {techs?.map(t => {
                    const Icon = technologyIconMap[t.slug] ?? null;
                    
                    return <div
                        key={t.id}
                        onClick={() => toggle(t)}
                        className={`inline-flex gap-3 items-center justify-center ${isSelected(t) && 'bg-black text-white dark:bg-white dark:text-black'} cursor-pointer py-2 border border-black dark:border-white/40 w-4/5 text-center transition-colors duration-200`}>
                        {Icon && <Icon color={t.color ?? "#38bdf8"} size={15} />}
                        <span>{toNormal(t.name)}</span>
                    </div>
                })}
            </label>

        </Accordion>
    )
}