package com.grouply.backend.service;

import com.grouply.backend.invitation.InvitationRepository;
import com.grouply.backend.invitation.InvitationService;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class InvitationServiceTest {


    @Mock
    private InvitationRepository invitationRepository;
    @Mock
    private ProjectMemberRepository projectMemberRepository;
    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private InvitationService invitationService;


    @BeforeEach
    void setup() {
        InvitationService real = new InvitationService(
                invitationRepository,
                projectMemberRepository,
                projectRepository,
                userRepository
        );
        invitationService = Mockito.spy(real);
    }


}
