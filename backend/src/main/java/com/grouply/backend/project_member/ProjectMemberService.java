package com.grouply.backend.project_member;

import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectMemberService implements IProjectMemberService{

    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;


    @Override
    public void removeMemberFromProject(Long userId, Long memberId, Long projectId) {
        
    }

    @Override
    public void addMemberToProject(Long userId, Long memberId, Long projectId) {

    }

    @Override
    public void requestToJoinProject(Long userId, Long ownerId, Long projectId) {

    }
}
