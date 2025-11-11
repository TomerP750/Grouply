import type { ActivityType } from "../enums/activity_type"
import type { UserDTO } from "./user_dto"


export interface ActivityDTO {
    id: number 
    message: string 
    navigateLink: string
    activityType: ActivityType
    user: UserDTO
    createdAt: Date
}