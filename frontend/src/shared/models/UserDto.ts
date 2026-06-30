import type { Role } from "../../features/authentication/models/Role"


export interface UserDTO {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    avatarUrl?: string
    role: Role 
    
}