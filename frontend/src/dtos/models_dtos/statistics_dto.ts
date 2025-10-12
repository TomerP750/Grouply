import type { UserDTO } from "./UserDTO"


export interface StatisticsDTO {

    completedProjects: number
    activeProjects: number
    connections: number
    user: UserDTO
}