import type { UserDTO } from "../user_dto";


export interface ConnectionRequestDTO {
    id: number
    sender: UserDTO
    recipient: UserDTO
    sentAt: Date
}