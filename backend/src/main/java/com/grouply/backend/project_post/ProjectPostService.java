package com.grouply.backend.project_post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.project_post.dto.CreateProjectPostDTO;
//import com.grouply.backend.project_post.dto.DeleteProjectPostDTO;
import com.grouply.backend.project_post.dto.ProjectPostDTO;
import com.grouply.backend.project_post.dto.UpdateProjectPostDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectPostService implements IProjectPostService {

    private final ProjectPostRepository projectPostRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;


    @Override
    public void createProjectPost(Long userId ,CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException {

        if (projectPostRepository.existsByProjectId(dto.getProjectId())) {
            throw new ExistsException("Post on project already exists");
        }
        if (!isOwner(userId, dto.getProjectId())) {
            throw new UnauthorizedException("You are not the owner of the project");
        }

        Project project = projectRepository
                .findById(dto.getProjectId()).orElseThrow(() -> new NoSuchElementException("Project not found"));

        ProjectPost newPost = ProjectPost.builder()
                .description(dto.getDescription())
                .title(dto.getTitle())
                .project(project)
                .build();
        projectPostRepository.save(newPost);

    }

    @Override
    public void updateProjectPost(Long userId ,UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException {

        ProjectPost post = fetchProjectPost(dto.getPostId());

        if (!isOwner(userId, post.getProject().getId())) {
            throw new UnauthorizedException("You are not the owner of the project");
        }
        if (dto.getDescription().isEmpty() || dto.getTitle().isEmpty()) {
            throw new InvalidInputException("One of the fields is empty");
        }

        post.setDescription(dto.getDescription());
        post.setTitle(dto.getTitle());
        projectPostRepository.save(post);
    }

    @Override
    public void deleteProjectPost(Long userId ,Long postId) throws UnauthorizedException {
        ProjectPost post = fetchProjectPost(postId);
        User user = fetchUser(userId);

        if (!isOwner(user.getId(), post.getProject().getId())) {
            throw new UnauthorizedException("Unauthorized ,cannot delete this post");
        }

        projectPostRepository.deleteById(post.getId());
    }

    @Override
    public ProjectPostDTO getOneProjectPost(Long postId) {
        return EntityToDtoMapper.toProjectPostDto(fetchProjectPost(postId));
    }

    @Override
    public Page<ProjectPostDTO> getAllProjectPosts(Pageable pageable) {
        Page<ProjectPost> allProjectPosts = projectPostRepository.findAll(pageable);
        return allProjectPosts.map(EntityToDtoMapper::toProjectPostDto);
    }



    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    private ProjectPost fetchProjectPost(Long postId) {
        return projectPostRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Post not found"));
    }

    private boolean isOwner(Long userId, Long projectId) {
        return projectMemberRepository
                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
    }
}
