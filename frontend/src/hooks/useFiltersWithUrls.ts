import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ProjectPosition } from "../dtos/enums/ProjectPosition";
import type { TechnologyDTO } from "../dtos/models_dtos/technology_dto";
import type { Direction } from "../context/filter_context";

export function useSyncFiltersWithUrl(
  roles: ProjectPosition[],
  techs: TechnologyDTO[],
  dir: Direction
) {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();

    roles.forEach((r) => params.append("roles", r));
    techs.forEach((t) => params.append("techIds", String(t.id)));
    params.append("dir", dir);

    const search = params.toString();

    
    navigate(`?${search}`, { replace: true });
  }, [roles, techs, navigate, dir]);
}
