package com.grouply.backend.archived_post;

import com.grouply.backend.archived_post.dto.ArchivedPostDTO;
import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.post.dto.PostDTO;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.post.Post;
import com.grouply.backend.post.PostRepository;
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
public class ArchivedPostService implements IArchivedPostService {

    private final ArchivedPostRepository archivedPostRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final PostRepository postRepository;
    private final ProjectMemberRepository projectMemberRepository;

    /**
     * Toggles archive project
     * it fetches the user and the project, then check if it exists
     * if it exists -> remove it from the database, otherwise create new object of it and add it to the database
     * @param userId
     * @param postId
     * @return
     */

    @Override
    public boolean toggleArchiveProject(Long userId, Long postId) throws ExistsException {

        log.info("entering toggle archive");

        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Project not found"));

        if (projectMemberRepository.existsByUserIdAndProjectId(user.getId(), post.getProject().getId())) {
            throw new ExistsException("You are already a member in the project");
        }

        boolean archiveExists = archivedPostRepository.existsByUserIdAndPostId(userId, postId);
        if (archiveExists) {
            ArchivedPost archivedPost = archivedPostRepository
                    .findByUserIdAndPostId(userId, postId)
                    .orElseThrow(() -> new NoSuchElementException("Project not found"));

            archivedPostRepository.deleteById(archivedPost.getId());
            return false;
        }

        ArchivedPost archivedPost = ArchivedPost.builder()
                .user(user)
                .post(post)
                .build();
        archivedPostRepository.save(archivedPost);
        log.info("Successful added project to archive!");
        return true;
    }

    public Page<PostDTO> allArchivedPosts(Long userId, Pageable pageable) {
        return archivedPostRepository
                .findByUserId(userId, pageable)
                .map(a -> EntityToDtoMapper.toProjectPostDto(a.getPost()));
    }

    public boolean isPostArchived(Long userId, Long postId) {
        return archivedPostRepository.existsByUserIdAndPostId(userId, postId);
    }

}
