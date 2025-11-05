package com.grouply.backend.project;

import com.grouply.backend.activity.ActivityService;
import com.grouply.backend.activity.ActivityType;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project.Dtos.CreateProjectDTO;
import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.post.Post;
import com.grouply.backend.post.PostRepository;
import com.grouply.backend.statistics.Statistics;
import com.grouply.backend.statistics.StatisticsRepository;
import com.grouply.backend.technology.Technology;
import com.grouply.backend.technology.TechnologyRepository;
import com.grouply.backend.technology.dto.TechnologyDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
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
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final TechnologyRepository technologyRepository;
    private final StatisticsRepository statisticsRepository;
    private final ActivityService activityService;


    @Override
    @Transactional
    public void createProject(Long userId, CreateProjectDTO dto) throws InvalidInputException {

        //TODO add validations
        if (dto.getName().isEmpty()) {
            throw new InvalidInputException("Name is empty");
        }

        User user = fetchUser(userId);

        Project project = Project.builder()
                .name(dto.getName())
                .projectMembers(new HashSet<>())
                .status(ProjectStatus.PREPARATION)
                .technologies(resolveTechnologies(dto.getTechnologies()))
                .build();

        ProjectMember owner = ProjectMember.builder()
                .user(user)
                .projectPosition(dto.getUserPosition())
                .projectRole(ProjectRole.OWNER)
                .project(project)
                .build();

        updateActiveProjectsStats(userId, '+');


        project.addMember(owner);
        projectRepository.save(project); // because i put cascade so it automatically saves the project member in the database

        activityService.createActivity("You created" + " " + project.getName() ,
                "/dashboard/" + userId + "/project-members/" + project.getId(),
                ActivityType.CREATED_PROJECT,
                user);

    }

    @Override
    @Transactional
    public void updateProject(Long userId, UpdateProjectDTO dto) throws UnauthorizedException, InvalidInputException {

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

        updateActiveProjectsStats(userId, '-');

        activityService.createActivity("You deleted project", null, ActivityType.DELETE_POST, fetchUser(userId));

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
        Page<Project> page = projectRepository.getUserOwnedProjects(userId, ProjectRole.OWNER, pageable);
        return page.map(EntityToDtoMapper::toProjectDto);
    }

    public List<ProjectDTO> getAllUserOwnedProjects(Long userId) {
        List<Project> projects = projectRepository.getAllUserOwnedProjects(userId, ProjectRole.OWNER);
        return projects.stream().map(EntityToDtoMapper::toProjectDto).toList();
    }

    public List<ProjectDTO> getFinishedProject(Long userId) {
        List<Project> projects = projectRepository
                .getAllUserOwnedFinishedProjects(userId, ProjectRole.OWNER, ProjectStatus.COMPLETED);
        return projects.stream().map(EntityToDtoMapper::toProjectDto).toList();
    }

    /**
     * Gets all the user's projects that with role owner that has no post.
     * @param userId
     * @return
     */
    public List<ProjectDTO> getAllUserProjectsWithNoPosts(Long userId) {
        List<Project> projects = projectRepository.findOwnedProjectsWithNoPosts(userId, ProjectRole.OWNER);
        return projects.stream().map(EntityToDtoMapper::toProjectDto).toList();
    }


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
        return projectRepository.findById(projectId).orElseThrow(() -> new NoSuchElementException("Project not found"));
    }

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    private Statistics fetchStats(Long userId) {
        return statisticsRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("Stats not found"));
    }

    private void updateActiveProjectsStats(Long userId, char op) {

        Statistics stats = fetchStats(userId);

        switch (op) {
            case '+':
                stats.setActiveProjects(stats.getActiveProjects() + 1);
                break;
            case '-':
                stats.setActiveProjects(stats.getActiveProjects() - 1);
                break;
        }

        statisticsRepository.save(stats);
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
        return (currentStatus == ProjectStatus.PREPARATION && newStatus == ProjectStatus.IN_PROGRESS) ||
                (currentStatus == ProjectStatus.IN_PROGRESS && newStatus == ProjectStatus.COMPLETED);
    }

    private void markAsFinished(User user, Project project) throws UnauthorizedException {


        if (!isOwner(user.getId(), project.getId())) {
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


    private Set<Technology> resolveTechnologies(Set<TechnologyDTO> dtos) throws InvalidInputException {

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
