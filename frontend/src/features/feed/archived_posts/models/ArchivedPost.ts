import type { PostDTO } from "../../shared/models/PostDto"

export interface ArchivedPostDTO {
    id: number
    post: PostDTO
    userId: number
    archivedAt: string

}