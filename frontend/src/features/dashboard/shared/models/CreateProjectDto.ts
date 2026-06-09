import type { TechnologyDTO } from "../../../../shared/models/TechnologyDto"
import type { ProjectPosition } from "../../../../shared/models/project/ProjectPosition"
import type { ProjectStatus } from "../../../../shared/models/project/ProjectStatus"



export interface CreateProjectDTO {
    
    name: string
    githubUrl: string
    status: ProjectStatus
    userPosition: ProjectPosition
    technologies: TechnologyDTO[]
}