import type { UserDTO } from "./UserDTO"


export interface ActivityDTO {
    id: number 
    message: string 
    user: UserDTO
    createdAt: Date
}