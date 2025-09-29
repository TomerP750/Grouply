package com.grouply.backend.user.Dtos;

import com.grouply.backend.user.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String avatarUrl;
    private Role role;
    private LocalDateTime createdAt;
}
