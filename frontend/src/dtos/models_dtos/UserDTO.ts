import type { Role } from "../enums/Role"


export class UserDTO {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    avatarUrl?: string
    role: Role 

    constructor(id:number, firstName: string,lastName: string,username: string,email: string,
    role: Role ,avatarUrl?: string ) {
        this.id = id;
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.username = username
        this.avatarUrl = avatarUrl;
        this.role = role
    }
    
}