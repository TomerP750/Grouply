export class ArchivedProjectDTO {
    id: number
    projectId: number
    userId: number
    archivedAt: string

    constructor(id: number, projectId: number, userId: number, archivedAt: string) {
        this.id = id
        this.projectId = projectId
        this.userId = userId
        this.archivedAt = archivedAt
    }
}