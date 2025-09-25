package com.grouply.backend.project;

import com.grouply.backend.group.Group;
import com.grouply.backend.group.GroupRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService implements IProjectService {

    private final ProjectRepository projectRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;


    @Override
    public void createProject(CreateProjectDTO dto) {
        Group group = groupRepository.findById(dto.getGroupId()).orElseThrow(()->new NoSuchElementException("Group not found"));

    }

    @Override
    public void updateProject(UpdateProjectDTO dto) {

    }

    @Override
    public void deleteProject(DeleteProjectDTO dto) {

    }

    @Override
    public void markAsFinished(Long userId ,Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(()->new NoSuchElementException("Project not found"));
        Group group = groupRepository.findById(project.getGroup().getId()).orElseThrow(() -> new NoSuchElementException("Group not found"));
        User user = userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));


    }
}
