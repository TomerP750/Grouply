import type { ProjectDTO } from "../../posts/models/ProjectDto"
import type { ProjectPostPositionDTO } from "./ProjectPostPositionDto"


export interface PostDTO {
  id: number
  title: string
  description: string
  projectDTO: ProjectDTO
  positions: ProjectPostPositionDTO[]
  postedAt: Date

}
