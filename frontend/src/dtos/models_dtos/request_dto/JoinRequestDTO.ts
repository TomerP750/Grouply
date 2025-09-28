

export class JoinRequestDTO {

    senderId: number
    projectPostId: number

    constructor(senderId: number,projectPostId: number) {
        this.senderId = senderId;
        this.projectPostId = projectPostId;
    }
}