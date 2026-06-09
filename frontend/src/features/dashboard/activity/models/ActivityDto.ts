import type { ActivityType } from "./ActivityType"
import type { UserDTO } from "../../../../shared/models/UserDto"


export interface ActivityDTO {
    id: number 
    message: string 
    navigateLink: string
    activityType: ActivityType
    user: UserDTO
    createdAt: Date
}