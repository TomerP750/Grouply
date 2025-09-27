package com.grouply.backend.archived_project;

import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
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

    /**
     * Toggles archive project
     * it fetches the user and the project, then check if it exists
     * if it exists -> remove it from the database, otherwise create new object of it and add it to the database
     * @param userId
     * @param projectId
     * @return
     */

    @Override
    public boolean toggleArchiveProject(Long userId, Long projectId) {

        log.info("entering toggle archive");
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NoSuchElementException("Project not found"));

        boolean archiveExists = archivedProjectRepository.existsByUserIdAndProjectId(userId, projectId);
        if (archiveExists) {
            ArchivedProject archivedProject = archivedProjectRepository
                    .findByUserIdAndProjectId(userId, projectId)
                    .orElseThrow(() -> new NoSuchElementException("Project not found"));

            archivedProjectRepository.deleteById(archivedProject.getId());
            return false;
        }

        ArchivedProject archivedProject = ArchivedProject.builder()
                .user(user)
                .project(project)
                .build();
        archivedProjectRepository.save(archivedProject);
        log.info("Successful added project to archive!");
        return true;
    }
}
