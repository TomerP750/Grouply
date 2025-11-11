import type { ProjectStatus } from "../enums/ProjectStatus"
import type { TechnologyDTO } from "./technology_dto"



export class ProjectDTO {
    id: number
    name: string
    status: ProjectStatus
    githubRepositoryUrl: string
    technologies: TechnologyDTO[]
    createdAt: Date
    

    constructor(id: number, name: string, gitHubRepositoryUrl: string ,status: ProjectStatus, technologies: TechnologyDTO[] , createdAt: Date) {
        this.id = id
        this.name = name
        this.status = status
        this.githubRepositoryUrl = gitHubRepositoryUrl
        this.technologies = technologies
        this.createdAt = createdAt
        
    }
}