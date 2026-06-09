
import type { ProjectPosition } from "./project/ProjectPosition"
import type { ProjectRole } from "./project/ProjectRole"
import type { UserDTO } from "./UserDto"

export interface ProjectMemberDTO {
    id: number
    user: UserDTO
    projectPosition: ProjectPosition
    projectRole: ProjectRole

}