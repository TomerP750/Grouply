

export class JoinRequestDTO {


    senderId: number
    projectPostPositionId: number
    projectPostId: number
    senderUsername: string
    id?: number
    requestedAt?: Date

    constructor(senderId: number, projectPostPositionId: number, projectPostId: number, senderUsername: string , id?: number, requestedAt?: Date) {

        this.senderId = senderId;
        this.projectPostPositionId = projectPostPositionId;
        this.projectPostId = projectPostId;
        this.senderUsername = senderUsername;
        this.id = id;
        this.requestedAt = requestedAt;
    }
}