import type { ProjectStatus } from "../enums/ProjectStatus"
import type { ProjectMemberDTO } from "./ProjectMemberDTO"



export class ProjectDTO {
    id: number
    name: string
    status: ProjectStatus
    createdAt: string
    members: ProjectMemberDTO[]

    constructor(id: number, name: string, status: ProjectStatus, createdAt: string, members: ProjectMemberDTO[]) {
        this.id = id
        this.name = name
        this.status = status
        this.createdAt = createdAt
        this.members = members
    }
}