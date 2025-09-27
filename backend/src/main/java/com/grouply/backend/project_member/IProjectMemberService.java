package com.grouply.backend.project_member;

public interface IProjectMemberService {

    void removeMemberFromProject(Long userId, Long memberId, Long projectId);

    void addMemberToProject(Long userId, Long memberId, Long projectId);

    void requestToJoinProject(Long userId, Long ownerId, Long projectId);

}
