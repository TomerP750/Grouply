package com.grouply.backend.invitation;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project_member.ProjectPosition;

public interface IInvitationService {

    boolean toggleInviteUserToProject(Long senderId, Long userId, Long projectId, ProjectPosition position) throws UnauthorizedException;

    void responseToInvitation(Long recipientId, Long invitationId ,InvitationStatus response);

}
