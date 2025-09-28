// --- enums & DTO imports ---
import { ProjectPosition } from "../../../dtos/enums/ProjectPosition";
import { ProjectRole } from "../../../dtos/enums/ProjectRole";
import { ProjectStatus } from "../../../dtos/enums/ProjectStatus";
import { Role } from "../../../dtos/enums/Role";

import { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import { ProjectMemberDTO } from "../../../dtos/models_dtos/ProjectMemberDTO";
import { ProjectPostDTO } from "../../../dtos/models_dtos/ProjectPostDTO";
import { ProjectPositionDTO } from "../../../dtos/models_dtos/ProjectPostPositionDTO"; // <- your class

// ---------- Users (match: id, firstName, lastName, username, email, role, avatarUrl?) ----------
const user1 = new UserDTO(1, "Alice", "Green", "aliceg", "alice@example.com", Role.USER);
const user2 = new UserDTO(2, "Bob", "Smith", "bobsmith", "bob@example.com", Role.USER);
const user3 = new UserDTO(3, "Charlie", "Brown", "charlieb", "charlie@example.com", Role.USER);
const user4 = new UserDTO(4, "Dana", "White", "danaw", "dana@example.com", Role.ADMIN);
const user5 = new UserDTO(5, "Eve", "Johnson", "evej", "eve@example.com", Role.USER);
const user6 = new UserDTO(6, "Frank", "Lee", "frankl", "frank@example.com", Role.USER);
const user7 = new UserDTO(7, "Grace", "Kim", "gracek", "grace@example.com", Role.USER);
const user8 = new UserDTO(8, "Henry", "Miller", "henrym", "henry@example.com", Role.USER);

// ---------- Members (match: id, user, position, role) ----------
export const members: ProjectMemberDTO[] = [
  new ProjectMemberDTO(1, user1, ProjectPosition.FRONTEND,  ProjectRole.OWNER),
  new ProjectMemberDTO(2, user2, ProjectPosition.BACKEND,   ProjectRole.MEMBER),
  new ProjectMemberDTO(3, user3, ProjectPosition.FULLSTACK, ProjectRole.MEMBER),
  new ProjectMemberDTO(4, user4, ProjectPosition.DESIGNER,  ProjectRole.OWNER),
  new ProjectMemberDTO(5, user5, ProjectPosition.BACKEND,   ProjectRole.MEMBER),
  new ProjectMemberDTO(6, user6, ProjectPosition.FRONTEND,  ProjectRole.MEMBER),
  new ProjectMemberDTO(7, user7, ProjectPosition.FULLSTACK, ProjectRole.MEMBER),
  new ProjectMemberDTO(8, user8, ProjectPosition.DESIGNER,  ProjectRole.MEMBER),
];

// ---------- Projects (match your ProjectDTO ctor) ----------
const project1 = new ProjectDTO(
  101,
  "FitVerse",
  ProjectStatus.PREPARATION,
  "2025-09-01T10:00:00Z",
  [members[0], members[1], members[2], members[3], members[4], members[5], members[6], members[7]]
);

const project2 = new ProjectDTO(
  102,
  "Grouply",
  ProjectStatus.IN_PROGRESS,
  "2025-09-15T14:30:00Z",
  [members[0]]
);

// ---------- Positions per post (match: id, projectPostId, position) ----------
const positionsForPost1: ProjectPositionDTO[] = [
  new ProjectPositionDTO(11, 1, ProjectPosition.FRONTEND),
  new ProjectPositionDTO(12, 1, ProjectPosition.DESIGNER),
];

const positionsForPost2: ProjectPositionDTO[] = [
  new ProjectPositionDTO(21, 2, ProjectPosition.BACKEND),
];

const positionsForPost3: ProjectPositionDTO[] = [
  new ProjectPositionDTO(31, 3, ProjectPosition.DESIGNER),
  new ProjectPositionDTO(32, 3, ProjectPosition.FRONTEND),
];

// ---------- Posts (match: id, title, description, positions, projectDTO, createdAt) ----------
export const dummies: ProjectPostDTO[] = [
  new ProjectPostDTO(
    1,
    "Looking for a React Developer",
    "We need a frontend React/TypeScript dev to help us build the dashboard UI.",
    positionsForPost1,
    project1,
    "2025-09-25T09:00:00Z"
  ),
  new ProjectPostDTO(
    2,
    "Backend Developer Wanted",
    "Searching for a Java Spring Boot developer to handle authentication and APIs.",
    positionsForPost2,
    project2,
    "2025-09-26T15:45:00Z"
  ),
  new ProjectPostDTO(
    3,
    "UI/UX Designer",
    "Our project requires a creative designer to work on mockups and responsive layouts.",
    positionsForPost3,
    project1,
    "2025-09-27T11:20:00Z"
  ),
];
