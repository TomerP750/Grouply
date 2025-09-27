package com.grouply.backend.project_member.dto;
import com.grouply.backend.user.Dtos.UserDTO;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMemberDTO {
    private Long id;
    private UserDTO user;
    private String projectPosition;
    private String projectRole;
}
