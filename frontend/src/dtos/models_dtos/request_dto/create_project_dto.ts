import type { ProjectPosition } from "../../enums/ProjectPosition"
import type { ProjectStatus } from "../../enums/ProjectStatus"
import type { TechnologyDTO } from "../technology_dto"


export interface CreateProjectDTO {
    
    name: string
    githubUrl: string
    status: ProjectStatus
    userPosition: ProjectPosition
    technologies: TechnologyDTO[]
}