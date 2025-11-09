import type { ProjectStatus } from "../../enums/ProjectStatus"


export interface UpdateProjectDTO {
    projectId: number 
    name: string
    status: ProjectStatus
}