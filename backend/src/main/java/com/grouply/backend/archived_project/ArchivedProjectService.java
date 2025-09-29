package com.grouply.backend.archived_project;

import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_post.ProjectPost;
import com.grouply.backend.project_post.ProjectPostRepository;
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
    private final ProjectPostRepository projectPostRepository;

    /**
     * Toggles archive project
     * it fetches the user and the project, then check if it exists
     * if it exists -> remove it from the database, otherwise create new object of it and add it to the database
     * @param userId
     * @param postId
     * @return
     */

    @Override
    public boolean toggleArchiveProject(Long userId, Long postId) {

        log.info("entering toggle archive");

        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        ProjectPost post = projectPostRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Project not found"));

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
