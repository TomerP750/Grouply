package com.grouply.backend.service;

import com.grouply.backend.authentication.AuthService;
import com.grouply.backend.user.Role;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {


    @Mock
    UserRepository userRepository;
    @Mock
    PasswordEncoder encoder;
    @Mock
    AuthenticationManager authenticationManager;

    @InjectMocks
    AuthService authService;


//    @Test
//    void login_returnToken_whenCredentialsValid() {
//        String email = "amail@mail.com";
//        String password = "secret";
//        String username = "userTest";
//        User principal = User.builder()
//                .username(username)
//                .email(email)
//                .password("encodedPass")
//                .build();
//
//        UsernamePasswordAuthenticationToken authToken =
//                new UsernamePasswordAuthenticationToken(principal, password);
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.of(principal));
//        when(encoder.matches(password, "encodedPass"));
//
//        Authentication result = authenticationManager.authenticate(authToken);
//
//        assertTrue(result.isAuthenticated());
//        assertTrue(principal, result.getPrincipal());
//    }

    @Test
    void login_throwsException_whenCredentialsInvalid() {

    }


    @Test
    void register_throwsException_whenEmailAlreadyExists() {

    }

}
