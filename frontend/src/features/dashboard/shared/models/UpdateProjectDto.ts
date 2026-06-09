import type { ProjectStatus } from "../../../../shared/models/project/ProjectStatus"


export interface UpdateProjectDTO {
    projectId: number 
    name: string
    status: ProjectStatus
}