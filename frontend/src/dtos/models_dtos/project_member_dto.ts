
import type { ProjectPosition } from "../enums/ProjectPosition"
import type { ProjectRole } from "../enums/ProjectRole"
import type { UserDTO } from "./user_dto"

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