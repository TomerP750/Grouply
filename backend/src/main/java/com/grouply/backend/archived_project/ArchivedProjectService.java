package com.grouply.backend.archived_project;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.post.Post;
import com.grouply.backend.post.PostRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArchivedProjectService implements IArchivedProjectService {

    private final ArchivedProjectRepository archivedProjectRepository;
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

        boolean archiveExists = archivedProjectRepository.existsByUserIdAndPostId(userId, postId);
        if (archiveExists) {
            ArchivedProject archivedProject = archivedProjectRepository
                    .findByUserIdAndPostId(userId, postId)
                    .orElseThrow(() -> new NoSuchElementException("Project not found"));

            archivedProjectRepository.deleteById(archivedProject.getId());
            return false;
        }

        ArchivedProject archivedProject = ArchivedProject.builder()
                .user(user)
                .post(post)
                .build();
        archivedProjectRepository.save(archivedProject);
        log.info("Successful added project to archive!");
        return true;
    }
}
