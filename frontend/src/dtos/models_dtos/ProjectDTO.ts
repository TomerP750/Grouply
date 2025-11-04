import type { ProjectStatus } from "../enums/ProjectStatus"
import type { TechnologyDTO } from "./TechnologyDTO"



export class ProjectDTO {
    id: number
    name: string
    status: ProjectStatus
    technologies: TechnologyDTO[]
    createdAt: Date
    

    constructor(id: number, name: string, status: ProjectStatus, technologies: TechnologyDTO[] , createdAt: Date) {
        this.id = id
        this.name = name
        this.status = status
        this.technologies = technologies
        this.createdAt = createdAt
        
    }
}