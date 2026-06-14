import type { ProjectPosition } from "../../../../../../shared/models/project/ProjectPosition"
import type { ProjectStatus } from "../../../../../../shared/models/project/ProjectStatus"
import type { TechnologyDTO } from "../../../../../../shared/models/TechnologyDto"




export interface CreateProjectDTO {
    
    name: string
    githubUrl: string
    status: ProjectStatus
    userPosition: ProjectPosition
    technologies: TechnologyDTO[]
}