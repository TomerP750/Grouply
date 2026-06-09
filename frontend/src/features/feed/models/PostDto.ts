import type { ProjectDTO } from "../posts/models/ProjectDto"
import type { ProjectPostPositionDTO } from "./ProjectPostPositionDto"


export class PostDTO {
  id: number
  title: string
  description: string
  projectDTO: ProjectDTO
  positions: ProjectPostPositionDTO[]
  postedAt: Date

  constructor(id: number, title: string, description: string, positions: ProjectPostPositionDTO[]  ,projectDTO: ProjectDTO, postedAt: Date) {
    this.id = id
    this.title = title
    this.description = description
    this.projectDTO = projectDTO
    this.positions = positions
    this.postedAt = postedAt
  }
}
