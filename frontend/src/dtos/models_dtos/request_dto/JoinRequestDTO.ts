import { ProjectPostPositionDTO } from "../ProjectPostPositionDTO";


export class JoinRequestDTO {

    senderId: number
    projectPostPosition: ProjectPostPositionDTO;
    projectPostId: number

    constructor(senderId: number, projectPostPosition: ProjectPostPositionDTO ,projectPostId: number) {
        this.senderId = senderId;
        this.projectPostPosition = projectPostPosition;
        this.projectPostId = projectPostId;
    }
}