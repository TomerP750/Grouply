package com.grouply.backend.features.post.post;

import com.grouply.backend.features.activity.ActivityService;
import com.grouply.backend.features.activity.ActivityType;
import com.grouply.backend.features.post.post.dto.CreateProjectPostDTO;
import com.grouply.backend.features.post.post.dto.PostDTO;
import com.grouply.backend.features.post.post.dto.UpdateProjectPostDTO;
import com.grouply.backend.features.post.project_post_position.ProjectPostPosition;
import com.grouply.backend.features.post.project_post_position.ProjectPostPositionRepository;
import com.grouply.backend.features.project.project.ProjectService;
import com.grouply.backend.features.project.project_member.ProjectMemberService;
import com.grouply.backend.shared.exceptions.ExistsException;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.features.project.project.Project;
import com.grouply.backend.features.project.project_member.ProjectPosition;
import com.grouply.backend.features.project.project_member.ProjectRole;
import com.grouply.backend.features.user.User;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import com.grouply.backend.features.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService implements IPostService {

    private final PostRepository postRepository;
    private final ProjectPostPositionRepository projectPostPositionRepository;
    private final ActivityService activityService;
    private final UserService userService;
    private final ProjectService projectService;
    private final ProjectMemberService projectMemberService;

    @Override
    public PostDTO createPost(Long userId , CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException {

        if (postRepository.existsByProjectId(dto.getProjectId())) {
            throw new ExistsException("Post on project already exists");
        }
        if (!projectMemberService.isProjectOwner(userId, dto.getProjectId())) {
            throw new UnauthorizedException("You are not the owner of the project");
        }

        Project project = projectService.fetchProject(dto.getProjectId());

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

        activityService.createActivity("You created a post",
                "/post/"+newPost.getId(),
                ActivityType.CREATED_POST,
                userId);

        return EntityToDtoMapper.toPostDto(newPost);
    }

    @Override
    public void updatePost(Long userId, UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException {

        Post post = fetchPost(dto.getPostId());

        if (!projectMemberService.isProjectOwner(userId, post.getProject().getId())) {
            throw new UnauthorizedException("You are not the owner of the project");
        }

        post.setDescription(dto.getDescription());
        post.setTitle(dto.getTitle());
        postRepository.save(post);
    }

    @Override
    public void deletePost(Long userId ,Long postId) throws UnauthorizedException {

        Post post = fetchPost(postId);
        User user = userService.findOneUser(userId);

        if (!projectMemberService.isProjectOwner(user.getId(), post.getProject().getId())) {
            throw new UnauthorizedException("Unauthorized ,cannot delete this post");
        }

        postRepository.deleteById(post.getId());

        activityService.createActivity("You deleted post: "+ "\"" + post.getTitle() + "\"",
                null,
                ActivityType.DELETE_POST,
                userId);
    }

    @Override
    public PostDTO getOnePost(Long postId) {
        return EntityToDtoMapper.toPostDto(fetchPost(postId));
    }

    @Override
    public Page<PostDTO> getAllPosts(Pageable pageable) {

        Page<Post> page = postRepository.findAllByOrderByPostedAtDesc(pageable);
        return page.map(EntityToDtoMapper::toPostDto);

    }

    public Page<PostDTO> getOwnedPosts(Long userId, Pageable pageable) {

        Page<Post> page = postRepository.findAllPostsWhereIsProjectOwner(userId, ProjectRole.OWNER, pageable);
        return page.map(EntityToDtoMapper::toPostDto);
    }


    private Post fetchPost(Long postId) {
        return postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Post not found"));
    }




}
