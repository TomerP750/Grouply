package com.grouply.backend.post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.post.dto.PostFilters;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.post.dto.CreateProjectPostDTO;
//import com.grouply.backend.project_post.dto.DeleteProjectPostDTO;
import com.grouply.backend.post.dto.PostDTO;
import com.grouply.backend.post.dto.UpdateProjectPostDTO;
import com.grouply.backend.project_post_position.ProjectPostPosition;
import com.grouply.backend.project_post_position.ProjectPostPositionRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService implements IPostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;
    private final ProjectPostPositionRepository projectPostPositionRepository;


    public Page<PostDTO> searchProjects(PostFilters filters, Pageable pageable) {
        return null;
    }

    @Override
    public PostDTO createPost(Long userId , CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException {

        if (postRepository.existsByProjectId(dto.getProjectId())) {
            throw new ExistsException("Post on project already exists");
        }
        if (!isOwner(userId, dto.getProjectId())) {
            throw new UnauthorizedException("You are not the owner of the project");
        }

        Project project = projectRepository
                .findById(dto.getProjectId()).orElseThrow(() -> new NoSuchElementException("Project not found"));



        // 1. Build the ProjectPost (but not saved yet)
        Post newPost = Post.builder()
                .description(dto.getDescription())
                .title(dto.getTitle())
                .project(project)
                .build();

        postRepository.save(newPost);

        for (ProjectPosition p : dto.getPositions()) {
            ProjectPostPosition postPosition = ProjectPostPosition.builder()
                    .post(newPost)
                    .position(p)
                    .build();

            projectPostPositionRepository.save(postPosition);
        }

        return EntityToDtoMapper.toProjectPostDto(newPost);
    }

    @Override
    public void updatePost(Long userId ,UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException {

        Post post = fetchProjectPost(dto.getPostId());

        if (!isOwner(userId, post.getProject().getId())) {
            throw new UnauthorizedException("You are not the owner of the project");
        }
        if (dto.getDescription().isEmpty() || dto.getTitle().isEmpty()) {
            throw new InvalidInputException("One of the fields is empty");
        }

        post.setDescription(dto.getDescription());
        post.setTitle(dto.getTitle());
        postRepository.save(post);
    }

    @Override
    public void deletePost(Long userId ,Long postId) throws UnauthorizedException {
        Post post = fetchProjectPost(postId);
        User user = fetchUser(userId);

        if (!isOwner(user.getId(), post.getProject().getId())) {
            throw new UnauthorizedException("Unauthorized ,cannot delete this post");
        }

        postRepository.deleteById(post.getId());
    }

    @Override
    public PostDTO getOnePost(Long postId) {
        return EntityToDtoMapper.toProjectPostDto(fetchProjectPost(postId));
    }

    @Override
    public Page<PostDTO> getAllPosts(Pageable pageable, @Nullable List<ProjectPosition> roles) {
        Page<Post> page = (roles == null || roles.isEmpty())
                ? postRepository.findAllByOrderByPostedAtDesc(pageable)
                : postRepository.findAllFiltered(roles, pageable);

        return page.map(EntityToDtoMapper::toProjectPostDto);
    }


    @Override
    public boolean requestToJoinProject(Long userId, Long ownerId, Long projectId) {
        return false;
    }


    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    private Post fetchProjectPost(Long postId) {
        return postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Post not found"));
    }

    private boolean isOwner(Long userId, Long projectId) {
        return projectMemberRepository
                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
    }
}
