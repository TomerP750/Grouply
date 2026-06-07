package com.grouply.backend.user;

import com.grouply.backend.user.Dtos.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toUserDto(User entity) {
        if (entity == null) return null;
        return UserDTO.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .avatarUrl(entity.getAvatarUrl())
                .role(entity.getRole())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
