import type { UserDTO } from "./user_dto"


export interface StatisticsDTO {

    completedProjects: number
    activeProjects: number
    connections: number
    user: UserDTO
}