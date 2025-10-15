package com.grouply.backend.invitation;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.invitation.dto.InvitationResponseDTO;
import com.grouply.backend.invitation.dto.InviteUserToProjectDTO;

public interface IInvitationService {

    boolean toggleInviteUserToProject(Long senderId ,InviteUserToProjectDTO dto) throws UnauthorizedException;

    void responseToInvitation(InvitationResponseDTO dto);

}
