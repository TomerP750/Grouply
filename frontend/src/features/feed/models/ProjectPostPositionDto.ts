import type { ProjectPosition } from "../../../shared/models/project/ProjectPosition";


export class ProjectPostPositionDTO {

    id: number 
    projectPostId: number
    position: ProjectPosition

    
    constructor(id: number, projectPostId: number,position: ProjectPosition) {
        this.id = id;
        this.projectPostId = projectPostId;
        this.position = position;
    }
}