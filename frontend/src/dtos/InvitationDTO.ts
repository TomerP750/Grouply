import type { InvitationStatus } from "../models/enums/InvitationStatus"

export class InvitationDTO {
    id: number
    senderId: number
    recipientId: number
    projectId: number
    status: InvitationStatus
    createdAt: string

    constructor(id: number, senderId: number, recipientId: number, projectId: number, status: InvitationStatus, createdAt: string) {
        this.id = id
        this.senderId = senderId
        this.recipientId = recipientId
        this.projectId = projectId
        this.status = status
        this.createdAt = createdAt
    }
}