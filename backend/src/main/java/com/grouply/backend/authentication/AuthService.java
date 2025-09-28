package com.grouply.backend.authentication;

import com.grouply.backend.authentication.dto.AuthResponseDTO;
import com.grouply.backend.authentication.dto.LoginRequestDTO;
import com.grouply.backend.authentication.dto.SignUpRequestDTO;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.profile.Profile;
import com.grouply.backend.profile.ProfileRepository;
import com.grouply.backend.security.CustomUserDetails;
import com.grouply.backend.security.JwtService;
import com.grouply.backend.user.Role;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService implements IAuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    @Override
    public AuthResponseDTO signup(SignUpRequestDTO dto) throws InvalidInputException {

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new InvalidInputException("Passwords are not match");
        }

        User user = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(encoder.encode(dto.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        Profile profile = Profile.builder()
                .about(null)
                .bannerUrl(null)
                .user(user)
                .build();
        profileRepository.save(profile);

        LoginRequestDTO loginRequest = new LoginRequestDTO(dto.getEmail(), dto.getPassword());
        return login(loginRequest);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO dto) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        CustomUserDetails principal = (CustomUserDetails) auth.getPrincipal();

        String token = jwtService.generateToken(principal.getId());
        return new AuthResponseDTO(token);
    }


}
