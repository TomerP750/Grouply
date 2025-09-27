package com.grouply.backend.project;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.finished_project.FinishedProject;
import com.grouply.backend.finished_project.FinishedProjectRepository;
import com.grouply.backend.project.Dtos.CreateProjectDTO;
import com.grouply.backend.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public void createProject(Long userId , CreateProjectDTO dto) throws InvalidInputException {

        //TODO add validations
        if (dto.getName().isEmpty()) {
            throw new InvalidInputException("Name is empty");
        }

        User user = fetchUser(userId);

        Project project = Project.builder()
                .name(dto.getName())
                .projectMembers(new HashSet<>())
                .status(ProjectStatus.PREPARATION)
//                .technologies(dto.getTechnologies())
                .build();

        ProjectMember owner = ProjectMember.builder()
                .user(user)
                .projectPosition(dto.getUserPosition())
                .projectRole(ProjectRole.OWNER)
                .project(project)
                .build();

        project.addMember(owner);
        projectRepository.save(project); // because i put cascade so it automatically saves the project member in the database

    }

    @Override
    @Transactional
    public void updateProject(Long userId , UpdateProjectDTO dto) throws UnauthorizedException, InvalidInputException {

        if (!isOwner(userId, dto.getProjectId())) {
            throw new UnauthorizedException("You are not allowed to update the project");
        }
//        if (dto.getTechnologies().isEmpty()) {
//            throw new InvalidInputException("At least one technology is required");
//        }

        User user = fetchUser(userId);

        Project project = fetchProject(dto.getProjectId());


        ProjectStatus currentStatus = project.getStatus();
        ProjectStatus newStatus = dto.getStatus();

        if (!isAllowedTransition(currentStatus, newStatus)) {
            throw new InvalidInputException("Cannot go backwards");
        }

        if (newStatus == ProjectStatus.COMPLETED) {
            markAsFinished(user, project);
        }

        project.setName(dto.getName());
        project.setStatus(dto.getStatus());
//        project.setTechnologies(dto.getTechnologies());
        projectRepository.save(project);

    }

    @Override
    @Transactional
    public void deleteProject(Long userId, Long projectId) throws UnauthorizedException {

        if (!isOwner(userId, projectId)) {
            throw new UnauthorizedException("You are not allowed to delete this project");
        }

        projectRepository.deleteById(projectId);

    }




    @Override
    @Transactional
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
//
//    @Override
//    @Transactional
//    public void removeUserFromProject(Long ownerId, Long memberToRemoveId, Long projectId) throws UnauthorizedException {
//
//        if (!isOwner(ownerId, projectId)) {
//            throw new UnauthorizedException("You are not authorized to remove user");
//        }
//
//        ProjectMember memberToRemove = fetchProjectMember(memberToRemoveId, projectId);
//
//        int ownerCount = projectMemberRepository
//                .countByProjectIdAndProjectRole(projectId, ProjectRole.OWNER);
//
//        if (memberToRemove.getProjectRole() == ProjectRole.OWNER && ownerCount <= 1) {
//            throw new IllegalStateException("Project must have at least one owner");
//        }
//
//        Project project = fetchProject(projectId);
//        project.getProjectMembers().remove(memberToRemove);
//
//        projectMemberRepository.deleteByIdAndProjectId(memberToRemoveId, projectId);
//
//    }



    

    //  ------------------------- HELPER METHODS --------------------------

    private boolean isOwner(Long userId, Long projectId) {
        return projectMemberRepository
                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
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
                .projectRole(ProjectRole.MEMBER)
                .projectPosition(position)
                .build();
    }

    private boolean isAllowedTransition(ProjectStatus currentStatus, ProjectStatus newStatus) {
        if (currentStatus == newStatus) return true;
        return (currentStatus == ProjectStatus.PREPARATION  && newStatus == ProjectStatus.IN_PROGRESS) ||
                (currentStatus == ProjectStatus.IN_PROGRESS  && newStatus == ProjectStatus.COMPLETED);
    }

    private void markAsFinished(User user, Project project) throws UnauthorizedException {


        if (!isOwner(user.getId(), project.getId())) {
            throw new UnauthorizedException("Unauthorized");
        }
        if (project.getStatus() == ProjectStatus.COMPLETED) {
            throw new UnauthorizedException("Project already completed");
        }

        project.setStatus(ProjectStatus.COMPLETED);

        FinishedProject finishedProject = FinishedProject.builder()
                .project(project)
                .build();
        finishedProjectRepository.save(finishedProject);

    }
}
