package com.grouply.backend.features.project.project;

import com.grouply.backend.features.activity.ActivityService;
import com.grouply.backend.features.activity.ActivityType;
import com.grouply.backend.features.project.project.Dtos.CreateProjectDTO;
import com.grouply.backend.features.project.project.Dtos.ProjectDTO;
import com.grouply.backend.features.project.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.features.project.project_member.ProjectMember;
import com.grouply.backend.features.project.project_member.ProjectMemberService;
import com.grouply.backend.features.project.project_member.ProjectRole;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.features.post.post.Post;
import com.grouply.backend.features.post.post.PostRepository;
import com.grouply.backend.features.statistics.Statistics;
import com.grouply.backend.features.statistics.StatisticsRepository;
import com.grouply.backend.features.technology.TechnologyMapper;
import com.grouply.backend.features.user.User;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import com.grouply.backend.features.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService implements IProjectService {

    private final ProjectRepository projectRepository;
    private final PostRepository postRepository;
    private final StatisticsRepository statisticsRepository;
    private final ActivityService activityService;
    private final UserService userService;
    private final ProjectMemberService projectMemberService;
    private final TechnologyMapper technologyMapper;


    @Override
    @Transactional
    public void createProject(Long userId, CreateProjectDTO dto) throws InvalidInputException {

        User user = userService.findOneUser(userId);

        Project project = Project.builder()
                .name(dto.getName())
                .projectMembers(new HashSet<>())
                .status(ProjectStatus.PREPARATION)
                .technologies(technologyMapper.toTechEntities(dto.getTechnologies()))
                .defaultDmLinks(dto.getDefaultDmLinks())
                .build();

        ProjectMember owner = ProjectMember.builder()
                .user(user)
                .projectPosition(dto.getUserPosition())
                .projectRole(ProjectRole.OWNER)
                .project(project)
                .build();

        incrementActiveProjects(userId);

        project.addMember(owner);
        projectRepository.save(project);

        activityService.createActivity("You created" + " " + project.getName() ,
                "/dashboard/" + userId + "/project-members/" + project.getId(),
                ActivityType.CREATED_PROJECT,
                userId);

    }

    @Override
    @Transactional
    public void updateProject(Long userId, UpdateProjectDTO dto) throws UnauthorizedException, InvalidInputException {

        if (!projectMemberService.isProjectOwner(userId, dto.getProjectId())) {
            throw new UnauthorizedException("You are not allowed to update the project");
        }

        User user = userService.findOneUser(userId);

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
        project.setDefaultDmLinks(dto.getDefaultDmLinks());
//        project.setTechnologies(dto.getTechnologies());
        projectRepository.save(project);

    }

    @Override
    @Transactional
    public void deleteProject(Long userId, Long projectId) throws UnauthorizedException {

        if (!projectMemberService.isProjectOwner(userId, projectId)) {
            throw new UnauthorizedException("You are not allowed to delete this project");
        }

        Post post = postRepository.findByProjectId(projectId);
        if (post != null) {
            postRepository.deleteById(post.getId());
        }

        Project project = fetchProject(projectId);

        project.getProjectMembers().forEach(m -> {
            Statistics stats = fetchStats(m.getUser().getId());
            stats.setCompletedProjects(stats.getCompletedProjects() + 1);
        });

        projectRepository.deleteById(projectId);

        decrementActiveProjects(userId);

        activityService.createActivity("You deleted project", null, ActivityType.DELETE_POST, userId);

    }


    @Override
    public Page<ProjectDTO> getAllProjects(Pageable pageable) {
        return projectRepository.findAll(pageable).map(EntityToDtoMapper::toProjectDto);
    }


    @Override
    public ProjectDTO getOneProject(Long projectId) {
        return EntityToDtoMapper.toProjectDto(fetchProject(projectId));
    }


    public Page<ProjectDTO> getUserOwnedProjects(Long userId, Pageable pageable) {
        Page<Project> page = projectRepository.findOwnedProjects(userId, ProjectRole.OWNER, pageable);
        return page.map(EntityToDtoMapper::toProjectDto);
    }

    public List<ProjectDTO> getAllUserOwnedProjects(Long userId) {
        List<Project> projects = projectRepository.findOwnedProjectsByUserList(userId, ProjectRole.OWNER);
        return projects.stream().map(EntityToDtoMapper::toProjectDto).toList();
    }

    public List<ProjectDTO> getFinishedProject(Long userId) {
        List<Project> projects = projectRepository
                .findOwnedProjectsByUserRoleAndStatus(userId, ProjectRole.OWNER, ProjectStatus.COMPLETED);
        return projects.stream().map(EntityToDtoMapper::toProjectDto).toList();
    }

    /**
     * Gets all the user's projects that with role owner that has no post.
     * @param userId
     * @return
     */
    public List<ProjectDTO> getAllUserProjectsWithNoPosts(Long userId) {
        List<Project> projects = projectRepository.findOwnedProjectsWithoutPosts(userId, ProjectRole.OWNER);
        return projects.stream().map(EntityToDtoMapper::toProjectDto).toList();
    }


    //  ------------------------- HELPER METHODS --------------------------


    public Project fetchProject(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(() -> new NoSuchElementException("Project not found"));
    }

    private Statistics fetchStats(Long userId) {
        return statisticsRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("Stats not found"));
    }

    private void incrementActiveProjects(Long userId) {
        statisticsRepository.incrementActiveProjects(userId);
    }

    private void decrementActiveProjects(Long userId) {
        statisticsRepository.decrementActiveProjects(userId);
    }

    private boolean isAllowedTransition(ProjectStatus currentStatus, ProjectStatus newStatus) {
        if (currentStatus == newStatus) return true;
        return (currentStatus == ProjectStatus.PREPARATION && newStatus == ProjectStatus.IN_PROGRESS) ||
                (currentStatus == ProjectStatus.IN_PROGRESS && newStatus == ProjectStatus.COMPLETED);
    }

    private void markAsFinished(User user, Project project) throws UnauthorizedException {

        if (!projectMemberService.isProjectOwner(user.getId(), project.getId())) {
            throw new UnauthorizedException("Unauthorized");
        }
        if (project.getStatus() == ProjectStatus.COMPLETED) {
            throw new UnauthorizedException("Project already completed");
        }

        project.setStatus(ProjectStatus.COMPLETED);

        project.getProjectMembers().forEach(m -> {
            Statistics stats = fetchStats(m.getUser().getId());
            stats.setCompletedProjects(stats.getCompletedProjects() + 1);
        });

    }



}
