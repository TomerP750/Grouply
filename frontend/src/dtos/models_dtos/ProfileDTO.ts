import type { PositionDTO } from "./PositionDTO"
import type { UserDTO } from "./UserDTO"


export class ProfileDTO {

    id: number
    about: string
    bannerUrl: string
    positions: PositionDTO[]
    user: UserDTO

    constructor(id: number,about: string,bannerUrl: string,positions: PositionDTO[],user: UserDTO) {
        this.id = id 
        this.about = about
        this.bannerUrl = bannerUrl
        this.positions = positions
        this.user = user
    }

}