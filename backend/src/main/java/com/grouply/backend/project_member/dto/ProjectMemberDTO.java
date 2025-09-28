package com.grouply.backend.project_member.dto;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
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
    private ProjectPosition projectPosition;
    private ProjectRole projectRole;
}
