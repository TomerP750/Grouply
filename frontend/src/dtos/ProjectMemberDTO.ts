import type { ProjectPosition } from "../models/enums/ProjectPosition"
import type { ProjectRole } from "../models/enums/ProjectRole"
import type { UserDTO } from "./UserDTO"

export class ProjectMemberDTO {
    id: number
    user: UserDTO
    projectPosition: ProjectPosition
    projectRole: ProjectRole

    constructor(id: number, user: UserDTO, projectPosition: ProjectPosition, projectRole: ProjectRole) {
        this.id = id
        this.user = user
        this.projectPosition = projectPosition
        this.projectRole = projectRole
    }
}