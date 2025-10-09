import type { ProjectPosition } from "../../enums/ProjectPosition"
import type { ProjectStatus } from "../../enums/ProjectStatus"
import type { TechnologyDTO } from "../TechnologyDTO"


export interface CreateProjectDTO {
    
    name: string
    status: ProjectStatus
    userPosition: ProjectPosition
    technologies: TechnologyDTO[]
}