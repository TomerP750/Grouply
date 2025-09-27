import type { Role } from "../enums/Role"


export class UserDTO {
    firstName: string
    lastName: string
    username: string
    email: string
    avatarUrl?: string
    role: Role 

    constructor(firstName: string,lastName: string,username: string,email: string,
    role: Role ,avatarUrl?: string ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.username = username
        this.avatarUrl = avatarUrl;
        this.role = role
    }
    
}