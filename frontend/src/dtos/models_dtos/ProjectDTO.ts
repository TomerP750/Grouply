import type { ProjectStatus } from "../enums/ProjectStatus"



export class ProjectDTO {
    id: number
    name: string
    status: ProjectStatus
    createdAt: Date
    // members: ProjectMemberDTO[]

    constructor(id: number, name: string, status: ProjectStatus, createdAt: Date) {
        this.id = id
        this.name = name
        this.status = status
        this.createdAt = createdAt
        // this.members = members
    }
}