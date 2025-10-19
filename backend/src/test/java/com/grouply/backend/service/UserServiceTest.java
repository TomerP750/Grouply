package com.grouply.backend.service;

import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.user.Role;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    void getOneUser_returnsUser_whenUserExists() {

        User user = User.builder()
                .id(1L)
                .firstName("fn")
                .lastName("ln")
                .email("test@mail.com")
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.findOneUser(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("fn", result.getFirstName());

        verify(userRepository).findById(1L);

    }

    @Test
    void checkUsernameExists_returnsTrue_whenUsernameExists() {
        String username = "userTest";

        when(userRepository.existsByUsername(username)).thenReturn(true);

        boolean result = userService.checkUsernameAvailability(username);

        assertTrue(result);

        verify(userRepository).existsByUsername(username);
    }


    @Test
    void checkIsUserAdmin_returnsTrue_whenUserRoleIsAdmin() {

        User user = User.builder()
                .id(1L)
                .username("adminman")
                .role(Role.ADMIN)
                .build();

        when(userRepository.existsByIdAndRole(user.getId(), user.getRole())).thenReturn(true);

        boolean result = userService.isAdmin(1L);

        assertTrue(result);

        verify(userRepository).existsByIdAndRole(1L, Role.ADMIN);
    }

}
