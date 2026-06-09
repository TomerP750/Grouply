import type { ProjectStatus } from "../../../../shared/models/project/ProjectStatus"
import type { TechnologyDTO } from "../../../../shared/models/TechnologyDto"



export interface ProjectDTO {
    id: number
    name: string
    status: ProjectStatus
    githubRepositoryUrl: string
    technologies: TechnologyDTO[]
    createdAt: Date
    
}