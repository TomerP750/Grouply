package com.grouply.backend.service;

import com.grouply.backend.project.project.ProjectRepository;
import com.grouply.backend.project.project_member.ProjectMemberRepository;
import com.grouply.backend.project.project_member.ProjectMemberService;
import com.grouply.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ProjectMemberServiceTest {

    @Mock
    ProjectMemberRepository projectMemberRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    ProjectRepository projectRepository;

    @InjectMocks
    ProjectMemberService projectMemberService;


    @Test
    void getUserById() {
        Long userId = 1L;

    }

    @Test
    void updateUser() {

    }

    @Test
    void deleteUser() {

    }

}
