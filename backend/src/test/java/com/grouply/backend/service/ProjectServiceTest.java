package com.grouply.backend.service;

import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project.ProjectService;
import com.grouply.backend.project.ProjectStatus;
import com.grouply.backend.project_member.ProjectMember;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {


    @Mock
    ProjectRepository projectRepository;
    @InjectMocks
    ProjectService projectService;


    @Test
    void getAll_returnPage_whenRepositoryHasData() {
        Pageable pageable = PageRequest.of(1, 2, Sort.by(Sort.Direction.DESC, "name"));

        Project p1 = Project.builder()
                .id(10L).name("Zeta")
                .projectMembers(new HashSet<>())
                .technologies(new HashSet<>())
                .status(ProjectStatus.IN_PROGRESS)
                .build();

        Project p2 = Project.builder()
                .id(11L).name("Zeta")
                .projectMembers(new HashSet<>())
                .technologies(new HashSet<>())
                .status(ProjectStatus.IN_PROGRESS)
                .build();


        List<Project> content = List.of(p1, p2);
        Page<Project> repoPage = new PageImpl<>(content, pageable, 7);

        when(projectRepository.findAll(pageable)).thenReturn(repoPage);

        // Act
        Page<ProjectDTO> result = projectService.getAllProjects(pageable);

        // Assert
        assertEquals(2, result.getSize());
        assertEquals(1, result.getNumber());
        assertEquals(7, result.getTotalElements());
        assertEquals(2, result.getContent().size());
        assertEquals("Zeta", result.getContent().get(0).getName());
        assertEquals(ProjectStatus.PREPARATION, result.getContent().get(1).getStatus());

        verify(projectRepository, times(1)).findAll(pageable);
        verifyNoMoreInteractions(projectRepository);


    }
}
