import type { ProjectDTO } from "./ProjectDTO"
import type { ProjectPositionDTO } from "./ProjectPostPositionDTO"

export class ProjectPostDTO {
  id: number
  title: string
  description: string
  projectDTO: ProjectDTO
  positions: ProjectPositionDTO[]
  createdAt: string

  constructor(id: number, title: string, description: string, positions: ProjectPositionDTO[]  ,projectDTO: ProjectDTO, createdAt: string) {
    this.id = id
    this.title = title
    this.description = description
    this.projectDTO = projectDTO
    this.positions = positions
    this.createdAt = createdAt
  }
}
