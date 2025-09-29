import { ProjectPostPositionDTO } from "../ProjectPostPositionDTO";


export class JoinRequestDTO {

    senderId: number
    projectPostPositionId: number
    projectPostId: number

    constructor(senderId: number, projectPostPositionId: number ,projectPostId: number) {
        this.senderId = senderId;
        this.projectPostPositionId = projectPostPositionId;
        this.projectPostId = projectPostId;
    }
}