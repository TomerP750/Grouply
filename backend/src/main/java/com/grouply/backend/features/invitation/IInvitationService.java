package com.grouply.backend.features.invitation;

import com.grouply.backend.features.invitation.dto.InvitationResponseDTO;
import com.grouply.backend.features.invitation.dto.InviteUserToProjectDTO;
import com.grouply.backend.shared.exceptions.UnauthorizedException;

public interface IInvitationService {

    boolean toggleInviteUserToProject(Long senderId , InviteUserToProjectDTO dto) throws UnauthorizedException;

    void responseToInvitation(InvitationResponseDTO dto);

}
