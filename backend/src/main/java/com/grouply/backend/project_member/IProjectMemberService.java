package com.grouply.backend.project_member;

import com.grouply.backend.exceptions.UnauthorizedException;

public interface IProjectMemberService {

    void removeMemberFromProject(Long userId, Long memberId, Long projectId);

    void requestToJoinProject(Long userId, Long ownerId, Long projectId);

}
