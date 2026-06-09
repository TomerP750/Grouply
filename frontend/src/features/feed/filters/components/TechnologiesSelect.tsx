import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { TechnologyDTO } from "../../../dtos/models_dtos/technology_dto";
import technologyService from "../../../service/technology_service";
import { technologyIconMap } from "../../../util/technology_icon_mapper";
import { toNormal } from "../../../util/format_functions";
import { Accordion } from "../../../components/shared/ui/Accordion";
import { useTranslation } from "react-i18next";
import { useProjectFilters } from "./hooks/useProjectFilters";



export function TechnologySelect() {

    const { techIds, updateFilters } = useProjectFilters();

    const [techs, setTechs] = useState<TechnologyDTO[]>([]);

    const { t } = useTranslation();

    const toggleTech = (id: number) => {
        const isSelected = techIds.includes(id);
        const nextTechs = isSelected
            ? techIds.filter((tId) => tId !== id) // Remove ID
            : [...techIds, id];                   // Add ID

        // Update the URL and reset pagination in one go
        updateFilters({
            techIds: nextTechs,
            page: "0"
        });
    };

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
                    const isActive = techIds.includes(t.id);

                    return <div
                        key={t.id}
                        onClick={() => toggleTech(t.id)}
                        className={`inline-flex gap-3 items-center justify-center ${isActive && 'bg-black text-white dark:bg-white dark:text-black'} cursor-pointer py-2 border border-black dark:border-white/40 w-4/5 text-center transition-colors duration-200`}>
                        {Icon && <Icon color={t.color ?? "#38bdf8"} size={15} />}
                        <span>{toNormal(t.name)}</span>
                    </div>
                })}
            </label>

        </Accordion>
    )
}