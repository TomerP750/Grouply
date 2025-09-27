package com.grouply.backend.util;
import com.grouply.backend.archived_project.ArchivedProject;
import com.grouply.backend.archived_project.dto.ArchivedProjectDTO;
import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project.Project;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.user.User;
import java.util.*;



public class EntityToDtoMapper {

    private EntityToDtoMapper() {}

    public static UserDTO toUserDto(User entity) {
        if (entity == null) return null;
        return UserDTO.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .avatarUrl(entity.getAvatarUrl())
                .role(entity.getRole())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public static List<UserDTO> toUserDtos(List<User> users) {
        if (users == null || users.isEmpty()) return List.of();
        List<UserDTO> result = new ArrayList<>(users.size());
        for (User u : users) {
            if (u != null) result.add(toUserDto(u));
        }
        return result;
    }


    public static ProjectMemberDTO toProjectMemberDto(ProjectMember pm) {
        if (pm == null) return null;
        return ProjectMemberDTO.builder()
                .id(pm.getId())
                .user(toUserDto(pm.getUser()))
                .projectPosition(pm.getProjectPosition() != null ? pm.getProjectPosition().name() : null)
                .projectRole(pm.getProjectRole() != null ? pm.getProjectRole().name() : null)
                .build();
    }

    public static List<ProjectMemberDTO> toProjectMemberDtos(List<ProjectMember> members) {
        List<ProjectMemberDTO> result = new ArrayList<>();
        if (members != null) {
            for (ProjectMember pm : members) {
                if (pm != null) result.add(toProjectMemberDto(pm));
            }
        }
        return result;
    }



    public static ProjectDTO toProjectDto(Project p) {
        if (p == null) return null;
        return ProjectDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .status(p.getStatus() != null ? p.getStatus().name() : null)
                .createdAt(p.getCreatedAt())
                .members(p.getProjectMembers() != null
                        ? toProjectMemberDtos(new ArrayList<>(p.getProjectMembers()))
                        : List.of())
                .build();
    }



    public static List<ProjectDTO> toProjectDtos(List<Project> projects) {
        List<ProjectDTO> result = new ArrayList<>();
        if (projects != null) {
            for (Project p : projects) {
                if (p != null) result.add(toProjectDto(p));
            }
        }
        return result;
    }



    public static ArchivedProjectDTO toArchivedProjectDto(ArchivedProject ap) {
        if (ap == null) return null;
        return ArchivedProjectDTO.builder()
                .id(ap.getId())
                .projectId(ap.getProject().getId())
                .userId(ap.getUser().getId())
                .archivedAt(ap.getArchivedAt())
                .build();
    }


    public static List<ArchivedProjectDTO> toArchivedProjectDtos(List<ArchivedProject> archived) {
        List<ArchivedProjectDTO> result = new ArrayList<>();
        if (archived != null) {
            for (ArchivedProject ap : archived) {
                if (ap != null) result.add(toArchivedProjectDto(ap));
            }
        }
        return result;
    }
}
