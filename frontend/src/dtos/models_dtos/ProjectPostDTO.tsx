import type { ProjectDTO } from "./ProjectDTO"

export class ProjectPostDTO {
  id: number
  title: string
  description: string
  projectDTO: ProjectDTO
  createdAt: string

  constructor(id: number, title: string, description: string, projectDTO: ProjectDTO, createdAt: string) {
    this.id = id
    this.title = title
    this.description = description
    this.projectDTO = projectDTO
    this.createdAt = createdAt
  }
}
