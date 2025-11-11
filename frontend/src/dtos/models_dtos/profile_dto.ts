import type { PositionDTO } from "./position_dto"
import type { SocialLinkDTO } from "./social_link"
import type { UserDTO } from "./user_dto"


export class ProfileDTO {

    id: number
    about: string
    bannerUrl: string
    positions: PositionDTO[]
    socialLinks: SocialLinkDTO[]
    user: UserDTO

    constructor(id: number,about: string,bannerUrl: string,positions: PositionDTO[], socialLinks: SocialLinkDTO[]  ,user: UserDTO) {
        this.id = id 
        this.about = about
        this.bannerUrl = bannerUrl
        this.positions = positions
        this.socialLinks = socialLinks
        this.user = user
    }

}