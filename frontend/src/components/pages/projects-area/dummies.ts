import { ProjectPosition } from "../../../dtos/enums/ProjectPosition"
import { ProjectRole } from "../../../dtos/enums/ProjectRole"
import { ProjectStatus } from "../../../dtos/enums/ProjectStatus"
import { Role } from "../../../dtos/enums/Role"
import { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO"
import { ProjectMemberDTO } from "../../../dtos/models_dtos/ProjectMemberDTO"
import { ProjectPostDTO } from "../../../dtos/models_dtos/ProjectPostDTO"
import { UserDTO } from "../../../dtos/models_dtos/UserDTO"


// User dummy
const user1 = new UserDTO("Alice", "Green", "aliceg", "alice@example.com", Role.USER)
const user2 = new UserDTO("Bob", "Smith", "bobsmith", "bob@example.com", Role.USER)
const user3 = new UserDTO("Charlie", "Brown", "charlieb", "charlie@example.com", Role.USER)
const user4 = new UserDTO("Dana", "White", "danaw", "dana@example.com", Role.ADMIN)
const user5 = new UserDTO("Eve", "Johnson", "evej", "eve@example.com", Role.USER)
const user6 = new UserDTO("Frank", "Lee", "frankl", "frank@example.com", Role.USER)
const user7 = new UserDTO("Grace", "Kim", "gracek", "grace@example.com", Role.USER)
const user8 = new UserDTO("Henry", "Miller", "henrym", "henry@example.com", Role.USER)

// ProjectMember dummy
export const members: ProjectMemberDTO[] = [
  new ProjectMemberDTO(1, user1, ProjectPosition.FRONTEND, ProjectRole.OWNER),
  new ProjectMemberDTO(2, user2, ProjectPosition.BACKEND, ProjectRole.MEMBER),
  new ProjectMemberDTO(3, user3, ProjectPosition.FULLSTACK, ProjectRole.MEMBER),
  new ProjectMemberDTO(4, user4, ProjectPosition.DESIGNER, ProjectRole.OWNER),
  new ProjectMemberDTO(5, user5, ProjectPosition.BACKEND, ProjectRole.MEMBER),
  new ProjectMemberDTO(6, user6, ProjectPosition.FRONTEND, ProjectRole.MEMBER),
  new ProjectMemberDTO(7, user7, ProjectPosition.FULLSTACK, ProjectRole.MEMBER),
  new ProjectMemberDTO(8, user8, ProjectPosition.DESIGNER, ProjectRole.MEMBER)
]


// Project dummy
const project1 = new ProjectDTO(
  101,
  "FitVerse",
  ProjectStatus.PREPARATION,
  "2025-09-01T10:00:00Z",
  [members[0], members[1],members[2],members[3],members[4],members[5],members[6],members[7],]
)

const project2 = new ProjectDTO(
  102,
  "Grouply",
  ProjectStatus.IN_PROGRESS,
  "2025-09-15T14:30:00Z",
  [members[0],]
)

// ProjectPost dummy
export const dummies: ProjectPostDTO[] = [
  new ProjectPostDTO(
    1,
    "Looking for a React Developer",
    "We need a frontend React/TypeScript dev to help us build the dashboard UI.",
    project1,
    "2025-09-25T09:00:00Z"
  ),
  new ProjectPostDTO(
    2,
    "Backend Developer Wanted",
    "Searching for a Java Spring Boot developer to handle authentication and APIs.",
    project2,
    "2025-09-26T15:45:00Z"
  ),
  new ProjectPostDTO(
    3,
    "UI/UX Designer",
    "Our project requires a creative designer to work on mockups and responsive layouts.",
    project1,
    "2025-09-27T11:20:00Z"
  )
]
