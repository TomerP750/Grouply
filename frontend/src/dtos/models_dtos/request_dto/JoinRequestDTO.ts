import { ProjectPostPositionDTO } from "../project_post_position_dto";


export class JoinRequestDTO {


    senderId: number
    projectPostPositionId: number
    projectPostId: number
    id?: number
    requestedAt?: Date

    constructor(senderId: number, projectPostPositionId: number, projectPostId: number, id?: number, requestedAt?: Date) {

        this.senderId = senderId;
        this.projectPostPositionId = projectPostPositionId;
        this.projectPostId = projectPostId;
        this.id = id;
        this.requestedAt = requestedAt;
    }
}