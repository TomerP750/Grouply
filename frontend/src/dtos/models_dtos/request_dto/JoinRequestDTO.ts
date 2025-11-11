import { ProjectPostPositionDTO } from "../project_post_position_dto";


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