import type { UserDTO } from "../../../shared/models/UserDto";


export interface ConnectionRequestDTO {
    id: number
    sender: UserDTO
    recipient: UserDTO
    sentAt: Date
}