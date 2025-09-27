package com.grouply.backend.invitation;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvitationDTO {
    private Long id;
    private Long senderId;
    private Long recipientId;
    private Long projectId;
    private String status;
    private LocalDateTime createdAt;
}
