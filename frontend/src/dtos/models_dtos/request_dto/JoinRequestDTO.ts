import { ProjectPostPositionDTO } from "../ProjectPostPositionDTO";


export class JoinRequestDTO {

    id: number
    senderId: number
    projectPostPositionId: number
    projectPostId: number
    requestedAt: Date

    constructor(id: number ,senderId: number, projectPostPositionId: number ,projectPostId: number, requestedAt: Date) {
        this.id = id;
        this.senderId = senderId;
        this.projectPostPositionId = projectPostPositionId;
        this.projectPostId = projectPostId;
        this.requestedAt = requestedAt;
    }
}