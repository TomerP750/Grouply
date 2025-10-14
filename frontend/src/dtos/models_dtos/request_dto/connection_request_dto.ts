import type { UserDTO } from "../UserDTO";


export interface ConnectionRequestDTO {
    id: number
    sender: UserDTO
    recipient: UserDTO
    sentAt: Date
}