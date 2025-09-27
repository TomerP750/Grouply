package com.grouply.backend.project;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.finished_project.FinishedProject;
import com.grouply.backend.finished_project.FinishedProjectRepository;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService implements IProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;
    private final FinishedProjectRepository finishedProjectRepository;


    @Override
    public void createProject(Long userId ,CreateProjectDTO dto) {

        //TODO add validations

        User user = fetchUser(userId);

        Project project = Project.builder()
                .name(dto.getName())
                .projectMembers(new HashSet<>())
                .status(ProjectStatus.PREPARATION)
                .technologies(dto.getTechnologies())
                .build();

        ProjectMember projectMember = ProjectMember.builder()
                .user(user)
                .projectPosition(dto.getUserPosition())
                .projectRole(ProjectRole.OWNER)
                .project(project)
                .build();

        projectRepository.save(project);
        projectMemberRepository.save(projectMember);

    }

    @Override
    public void updateProject(Long userId ,UpdateProjectDTO dto) {

    }

    @Override
    public void deleteProject(Long userId ,DeleteProjectDTO dto) {

    }

    @Override
    public void changeStatus(Long userId, Long projectId, ProjectStatus status) throws UnauthorizedException {

        if (!isOwner(userId, projectId)) {
            throw new UnauthorizedException("You are not allowed to change the status");
        }

        Project project = fetchProject(projectId);

        if (project.getStatus() == ProjectStatus.COMPLETED) {
            throw new RuntimeException("Cannot invoke completed project");
        }

        if (status == ProjectStatus.COMPLETED) {
            markAsFinished(userId, projectId);
            return;
        }

        project.setStatus(status);
        projectRepository.save(project);

    }


    @Override
    public void markAsFinished(Long userId ,Long projectId) throws UnauthorizedException {

        Project project = fetchProject(projectId);

        User user = fetchUser(userId);

        if (!isOwner(user.getId(), projectId)) {
            throw new UnauthorizedException("Unauthorized");
        }
        if (project.getStatus() == ProjectStatus.COMPLETED) {
            throw new UnauthorizedException("Project already completed");
        }

        project.setStatus(ProjectStatus.COMPLETED);
        projectRepository.save(project);


        FinishedProject finishedProject = FinishedProject.builder()
                .project(project)
                .build();
        finishedProjectRepository.save(finishedProject);

    }

    @Override
    public void addUserToProject(Long ownerId, ProjectPosition position, Long projectId, Long userId) throws UnauthorizedException {


        if (!isOwner(ownerId, projectId)) {
            throw new UnauthorizedException("You are not allowed");
        }

        User user = fetchUser(userId);
        Project project = fetchProject(projectId);


        boolean alreadyMember = project.getProjectMembers().stream()
                .anyMatch(pm -> pm.getUser().getId().equals(userId));
        if (alreadyMember) {
            throw new IllegalStateException("User is already a member of this project");
        }

        ProjectMember newMember = buildProjectMember(user, position, project);

        project.getProjectMembers().add(newMember);
        projectRepository.save(project);
    }

    @Override
    public void removeUserFromProject(Long ownerId, Long memberToRemoveId, Long projectId) throws UnauthorizedException {

        if (!isOwner(ownerId, projectId)) {
            throw new UnauthorizedException("You are unauthorized to remove user");
        }

        Project project = fetchProject(projectId);
        ProjectMember memberToRemove = project.getProjectMembers()
                .stream()
                .filter(pm -> pm.getId().equals(memberToRemoveId)).findFirst().orElseThrow(() -> new NoSuchElementException("Not found"));
        project.getProjectMembers().remove(memberToRemove);
        projectRepository.save(project);


    }



    

    //  ------------------------- HELPER METHODS --------------------------

    private boolean isOwner(Long userId, Long projectId) {
        Project project = fetchProject(projectId);
        return project
                .getProjectMembers()
                .stream()
                .anyMatch(m -> m.getUser().getId().equals(userId) && m.getProjectRole() == ProjectRole.OWNER);
    }

    private ProjectMember fetchProjectMember(Long memberId, Long projectId) {
        return projectMemberRepository
                .findByIdAndProjectId(memberId, projectId).orElseThrow(() -> new NoSuchElementException("Member not found"));
    }

    private Project fetchProject(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(()->new NoSuchElementException("Project not found"));
    }

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
    }

    private ProjectMember buildProjectMember(User user, ProjectPosition position, Project project) {
        return ProjectMember.builder()
                .user(user)
                .project(project)
                .projectRole(ProjectRole.USER)
                .projectPosition(position)
                .build();
    }
}
