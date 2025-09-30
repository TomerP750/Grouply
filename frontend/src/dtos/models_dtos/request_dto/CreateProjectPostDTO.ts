import type { ProjectPosition } from "../../enums/ProjectPosition"


export class CreateProjectPostDTO {

    title: string
    description: string
    positions: ProjectPosition[]
    projectId: number

    constructor(title: string, description: string,positions: ProjectPosition[] ,projectId: number) {
        this.title = title
        this.description = description
        this.positions = positions
        this.projectId = projectId
    }
 
}