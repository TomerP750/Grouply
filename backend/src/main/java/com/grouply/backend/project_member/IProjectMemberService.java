package com.grouply.backend.project_member;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project_member.dto.ProjectMemberDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProjectMemberService {

    void removeMemberFromProject(Long userId, Long memberId, Long projectId) throws UnauthorizedException;


//    void requestToJoinProject(Long userId, Long ownerId, Long projectId);

    Page<ProjectMemberDTO> allProjectMembersPagination(Long projectId, Pageable pageable);

}
