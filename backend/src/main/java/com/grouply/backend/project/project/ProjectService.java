package com.grouply.backend.project.project;

import com.grouply.backend.activity.ActivityService;
import com.grouply.backend.activity.ActivityType;
import com.grouply.backend.project.project_member.*;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.project.project.Dtos.CreateProjectDTO;
import com.grouply.backend.project.project.Dtos.ProjectDTO;
import com.grouply.backend.project.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.post.post.Post;
import com.grouply.backend.post.post.PostRepository;
import com.grouply.backend.statistics.Statistics;
import com.grouply.backend.statistics.StatisticsRepository;
import com.grouply.backend.technology.Technology;
import com.grouply.backend.technology.TechnologyRepository;
import com.grouply.backend.technology.dto.TechnologyDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import com.grouply.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService implements IProjectService {

    private final ProjectRepository projectRepository;
    private final PostRepository postRepository;
    private final TechnologyRepository technologyRepository;
    private final StatisticsRepository statisticsRepository;
    private final ActivityService activityService;
    private final UserService userService;
    private final ProjectMemberService projectMemberService;


    @Override
    @Transactional
    public void createProject(Long userId, CreateProjectDTO dto) throws InvalidInputException {

        //TODO add validations
        if (dto.getName().isEmpty()) {
            throw new InvalidInputException("Name is empty");
        }

        User user = userService.findOneUser(userId);

        Project project = Project.builder()
                .name(dto.getName())
                .projectMembers(new HashSet<>())
                .status(ProjectStatus.PREPARATION)
                .technologies(toTechEntities(dto.getTechnologies()))
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
        projectRepository.save(project); // because i put cascade so it automatically saves the project member in the database

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
//        if (dto.getTechnologies().isEmpty()) {
//            throw new InvalidInputException("At least one technology is required");
//        }

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

    /**
     * Resolves and validates a set of technologies provided as DTOs into persistent Technology entities.
     *
     * This method is used during post creation to ensure that all referenced technologies exist in the database
     * before associating them with the post.
     *
     * Validation rules:
     * - The input set must not be null or empty.
     * - All DTOs must contain valid non-null IDs.
     * - All referenced Technology entities must exist in the database.
     *
     * If any of these conditions are violated, an exception is thrown to prevent creation of invalid post data.
     *
     * @param dtos the set of TechnologyDTO objects provided in the request
     * @return a validated set of Technology entities corresponding to the provided DTO IDs
     * @throws InvalidInputException if the input set is null or empty
     * @throws NoSuchElementException if one or more technology IDs do not exist in the database
     */
    private Set<Technology> toTechEntities(Set<TechnologyDTO> dtos) throws InvalidInputException {

        if (dtos == null || dtos.isEmpty()) {
            throw new InvalidInputException("Technologies list is empty");
        }

        Set<Long> ids = dtos.stream()
                .map(TechnologyDTO::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        List<Technology> technologies = technologyRepository.findAllById(ids);

        if (technologies.size() != ids.size()) {
            throw new NoSuchElementException("Some technologies were not found");
        }

        return new HashSet<>(technologies);

    }
}
