package com.grouply.backend.util;
import com.grouply.backend.archived_project.ArchivedProject;
import com.grouply.backend.archived_project.dto.ArchivedProjectDTO;
//import com.grouply.backend.chat_member.ChatMember;
//import com.grouply.backend.chat_member.dto.ChatMemberDTO;
//import com.grouply.backend.chat_message.ChatMessage;
//import com.grouply.backend.chat_message.dto.ChatMessageDTO;
//import com.grouply.backend.chat_room.ChatRoom;
//import com.grouply.backend.chat_room.dto.ChatRoomDTO;
import com.grouply.backend.position.Position;
import com.grouply.backend.position.dto.PositionDTO;
import com.grouply.backend.profile.Profile;
import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project.Project;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.post.Post;
import com.grouply.backend.post.dto.ProjectPostDTO;
import com.grouply.backend.project_post_position.ProjectPostPosition;
import com.grouply.backend.project_post_position.dto.ProjectPostPositionDTO;
import com.grouply.backend.technology.Technology;
import com.grouply.backend.technology.dto.TechnologyDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.user.User;
import java.util.*;
import java.util.stream.Collectors;


public class EntityToDtoMapper {

    private EntityToDtoMapper() {}

    public static UserDTO toUserDto(User entity) {
        if (entity == null) return null;
        return UserDTO.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
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
                .projectPosition(pm.getProjectPosition())
                .projectRole(pm.getProjectRole())
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
                .status(p.getStatus())
                .createdAt(p.getCreatedAt())
                .technologies(toTechnologiesDtos(p.getTechnologies()))
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
                .projectPostId(ap.getPost().getId())
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


    public static ProjectPostDTO toProjectPostDto(Post post) {
        if (post == null) return null;

        return ProjectPostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .projectDTO(EntityToDtoMapper.toProjectDto(post.getProject()))
                .postedAt(post.getPostedAt())
                .positions(toProjectPositionDtos(post.getPositions()))
                .build();
    }

    public static List<ProjectPostDTO> toProjectPostDtos(List<Post> posts) {
        List<ProjectPostDTO> result = new ArrayList<>();
        if (posts != null) {
            for (Post posting : posts) {
                if (posting != null) {
                    result.add(toProjectPostDto(posting));
                }
            }
        }
        return result;
    }


    public static PositionDTO toPositionDto(Position p) {
        if (p == null) return null;
        return PositionDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .build();
    }

    public static List<PositionDTO> toPositionDtos(List<Position> positions) {
        List<PositionDTO> result = new ArrayList<>();
        if (positions != null) {
            for (Position pos : positions) {
                if (pos != null) {
                    result.add(toPositionDto(pos));
                }
            }
        }
        return result;
    }

    public static ProfileDTO toProfileDto(Profile profile) {
        return ProfileDTO.builder()
                .about(profile.getAbout())
                .bannerUrl(profile.getBannerUrl())
                .user(toUserDto(profile.getUser()))
                .positions(toPositionDtos(profile.getPositions()))
                .build();
    }



    public static ProjectPostPositionDTO toProjectPositionDto(ProjectPostPosition pos) {
        if (pos == null) return null;

        Long postId = (pos.getPost() != null) ? pos.getPost().getId() : null;

        return ProjectPostPositionDTO.builder()
                .id(pos.getId())
                .projectPostId(postId)
                .position(pos.getPosition())
                .build();
    }


    public static List<ProjectPostPositionDTO> toProjectPositionDtos(List<ProjectPostPosition> positions) {
        if (positions == null || positions.isEmpty()) return Collections.emptyList();
        List<ProjectPostPositionDTO> result = new ArrayList<>(positions.size());
        for (ProjectPostPosition p : positions) {
            if (p != null) result.add(toProjectPositionDto(p));
        }
        return result;
    }

    public static TechnologyDTO toTechnologyDto(Technology entity) {
        return TechnologyDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static Set<TechnologyDTO> toTechnologiesDtos(Set<Technology> entities) {
        if (entities == null || entities.isEmpty()) return Collections.emptySet();
        Set<TechnologyDTO> result = new HashSet<>(entities.size());
        for (Technology t : entities) {
            if (t != null) result.add(toTechnologyDto(t));
        }
        return result;
    }



//    public static ChatMemberDTO toChatMemberDto(ChatMember entity) {
//        if (entity == null) return null;
//
//        return ChatMemberDTO.builder()
//                .id(entity.getId())
//                .projectMemberId(entity.getMember().getId())
//                .userId(entity.getMember().getUser().getId())
//                .username(entity.getMember().getUser().getUsername())
//                .avatarUrl(entity.getMember().getUser().getAvatarUrl())
//                .build();
//    }
//
//    public static ChatMessageDTO toChatMessageDto(ChatMessage entity) {
//        if (entity == null) return null;
//
//        return ChatMessageDTO.builder()
//                .id(entity.getId())
//                .content(entity.getContent())
//                .status(entity.getStatus())
//                .sentAt(entity.getSentAt())
//                .chatRoomId(entity.getChatRoom().getId())
//                .sender(toChatMemberDto(entity.getMember()))
//                .build();
//    }
//
//
//    public static ChatRoomDTO toChatRoomDto(ChatRoom entity) {
//        if (entity == null) return null;
//
//        List<ChatMemberDTO> memberDtos = null;
//        if (entity.getMembers() != null) {
//            memberDtos = entity.getMembers().stream()
//                    .map(EntityToDtoMapper::toChatMemberDto)
//                    .collect(Collectors.toList());
//        }
//
//        return ChatRoomDTO.builder()
//                .id(entity.getId())
//                .name(entity.getName())
//                .projectId(entity.getProject() != null ? entity.getProject().getId() : null)
//                .members(memberDtos)
//                .build();
//    }


}
