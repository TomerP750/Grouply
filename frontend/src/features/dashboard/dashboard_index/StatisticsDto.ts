import type { UserDTO } from "../../shared/models/UserDto"


export interface StatisticsDTO {

    completedProjects: number
    activeProjects: number
    joinRequestsCount: number
    user: UserDTO
}