package com.grouply.backend.shared.util;
import com.grouply.backend.features.post.archived_post.ArchivedPost;
import com.grouply.backend.features.post.archived_post.dto.ArchivedPostDTO;
import com.grouply.backend.features.connection.connection_request.ConnectionRequest;
import com.grouply.backend.features.connection.connection_request.dto.ConnectionRequestDTO;
import com.grouply.backend.features.join_request.JoinRequest;
import com.grouply.backend.features.join_request.dto.JoinRequestDTO;
import com.grouply.backend.features.position.Position;
import com.grouply.backend.features.position.dto.PositionDTO;
import com.grouply.backend.features.profile.profile.Profile;
import com.grouply.backend.features.profile.dto.ProfileDTO;
import com.grouply.backend.features.project.project.Dtos.ProjectDTO;
import com.grouply.backend.features.project.project.Project;
import com.grouply.backend.features.project.project_member.ProjectMember;
import com.grouply.backend.features.project.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.features.post.post.Post;
import com.grouply.backend.features.post.post.dto.PostDTO;
import com.grouply.backend.features.post.project_post_position.ProjectPostPosition;
import com.grouply.backend.features.post.project_post_position.dto.ProjectPostPositionDTO;
import com.grouply.backend.profile.social_link.SocialLink;
import com.grouply.backend.profile.social_link.dto.SocialLinkDTO;
import com.grouply.backend.features.technology.Technology;
import com.grouply.backend.features.technology.dto.TechnologyDTO;
import com.grouply.backend.features.user.Dtos.UserDTO;
import com.grouply.backend.features.user.User;
import java.util.*;


public class EntityToDtoMapper {

    private EntityToDtoMapper() {}

    //remove
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




    public static ProjectMemberDTO toProjectMemberDto(ProjectMember pm) {
        if (pm == null) return null;
        return ProjectMemberDTO.builder()
                .id(pm.getId())
                .user(toUserDto(pm.getUser()))
                .projectPosition(pm.getProjectPosition())
                .projectRole(pm.getProjectRole())
                .build();
    }


    public static ProjectDTO toProjectDto(Project p) {
        if (p == null) return null;
        return ProjectDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .status(p.getStatus())
                .githubRepositoryUrl(p.getGithubRepositoryUrl())
                .createdAt(p.getCreatedAt())
                .technologies(toTechnologiesDtos(p.getTechnologies()))
                .build();
    }




    public static ArchivedPostDTO toArchivedProjectDto(ArchivedPost ap) {
        if (ap == null) return null;
        return ArchivedPostDTO.builder()
                .id(ap.getId())
                .projectPost(toPostDto(ap.getPost()))
                .userId(ap.getUser().getId())
                .archivedAt(ap.getArchivedAt())
                .build();
    }


    public static List<ArchivedPostDTO> toArchivedProjectDtos(List<ArchivedPost> archived) {
        List<ArchivedPostDTO> result = new ArrayList<>();
        if (archived != null) {
            for (ArchivedPost ap : archived) {
                if (ap != null) result.add(toArchivedProjectDto(ap));
            }
        }
        return result;
    }


    public static PostDTO toPostDto(Post post) {
        if (post == null) return null;

        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .projectDTO(EntityToDtoMapper.toProjectDto(post.getProject()))
                .postedAt(post.getPostedAt())
                .positions(toProjectPositionDtos(post.getPositions()))
                .build();
    }

    public static List<PostDTO> toPostDtos(List<Post> posts) {
        List<PostDTO> result = new ArrayList<>();
        if (posts != null) {
            for (Post posting : posts) {
                if (posting != null) {
                    result.add(toPostDto(posting));
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
                .id(profile.getId())
                .about(profile.getAbout())
                .bannerUrl(profile.getBannerUrl())
//                .socialLinks(toSocialLinkDtos(profile.getSocialLinks()))
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

    // remove
    public static TechnologyDTO toTechnologyDto(Technology entity) {
        return TechnologyDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .color(entity.getColor())
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

    public static JoinRequestDTO toJoinRequestDto(JoinRequest entity) {
        return JoinRequestDTO.builder()
                .id(entity.getId())
                .projectPostId(entity.getPost().getId())
                .projectPostPositionId(entity.getPosition().getId())
                .senderUsername(entity.getSender().getUsername())
                .senderId(entity.getSender().getId())
                .requestedAt(entity.getRequestedAt())
                .build();
    }

    public static ConnectionRequestDTO toConnectionRequestDto(ConnectionRequest entity) {
        return ConnectionRequestDTO.builder()
                .id(entity.getId())
                .recipient(toUserDto(entity.getRecipient()))
                .sender(toUserDto(entity.getSender()))
                .sentAt(entity.getSentAt())
                .build();
    }

}
