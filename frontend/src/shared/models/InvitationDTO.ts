import type { InvitationStatus } from "../../features/dashboard/shared/models/InvitationStatus"

export interface InvitationDTO {
    id: number
    senderId: number
    recipientId: number
    projectId: number
    status: InvitationStatus
    createdAt: string

}