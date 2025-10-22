import type { PostDTO } from "./PostDTO"

export class ArchivedPostDTO {
    id: number
    post: PostDTO
    userId: number
    archivedAt: string

    constructor(id: number, post: PostDTO, userId: number, archivedAt: string) {
        this.id = id
        this.post = post
        this.userId = userId
        this.archivedAt = archivedAt
    }
}