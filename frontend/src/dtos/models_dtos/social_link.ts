import type { SocialType } from "../enums/social_type"
import type { ProfileDTO } from "./ProfileDTO"


export interface SocialLinkDTO {

    id: number
    link: string
    type: SocialType
    profile: ProfileDTO

}