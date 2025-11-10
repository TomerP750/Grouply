import { ProjectPostPositionDTO } from "../ProjectPostPositionDTO";


export class JoinRequestDTO {

    senderId: number
    projectPostPositionId: number
    projectPostId: number
    requestedAt: Date

    constructor(senderId: number, projectPostPositionId: number ,projectPostId: number, requestedAt: Date) {
        this.senderId = senderId;
        this.projectPostPositionId = projectPostPositionId;
        this.projectPostId = projectPostId;
        this.requestedAt = requestedAt;
    }
}