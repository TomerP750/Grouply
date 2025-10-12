package com.grouply.backend.authentication;

import com.grouply.backend.authentication.dto.AuthResponseDTO;
import com.grouply.backend.authentication.dto.LoginRequestDTO;
import com.grouply.backend.authentication.dto.SignUpRequestDTO;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.profile.Profile;
import com.grouply.backend.profile.ProfileRepository;
import com.grouply.backend.security.CustomUserDetails;
import com.grouply.backend.security.JwtService;
import com.grouply.backend.statistics.Statistics;
import com.grouply.backend.statistics.StatisticsRepository;
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
    private final StatisticsRepository statisticsRepository;


    /**
     * Registers a new user account and returns an authentication response.
     *
     * Steps:
     * - Validates that the password and confirmPassword fields match.
     * - Creates and saves a new User with the USER role and an encoded password.
     * - Creates and saves a Profile linked to the new User.
     * - Automatically logs the user in using their email and password.
     * - Returns an AuthResponseDTO containing a generated JWT.
     *
     * @param dto the sign-up request containing account details such as first name, last name, username, email, password, and confirmPassword
     * @return an AuthResponseDTO containing a JWT for the newly created user session
     * @throws InvalidInputException if the password and confirmPassword do not match
     */

    @Override
    public AuthResponseDTO signup(SignUpRequestDTO dto) throws InvalidInputException {

        if (!dto.getAccountDetails().getPassword().equals(dto.getAccountDetails().getConfirmPassword())) {
            throw new InvalidInputException("Passwords are not match");
        }

        User user = User.builder()
                .firstName(dto.getAccountDetails().getFirstName())
                .lastName(dto.getAccountDetails().getLastName())
                .username(dto.getAccountDetails().getUsername())
                .email(dto.getAccountDetails().getEmail())
                .password(encoder.encode(dto.getAccountDetails().getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        System.out.println(user);

        Profile profile = Profile.builder()
                .about(null)
                .bannerUrl(null)
                .user(user)
                .build();
        profileRepository.save(profile);

        Statistics statistics = Statistics.builder()
                .completedProjects(0)
                .activeProjects(0)
                .connections(0)
                .user(user)
                .build();

        statisticsRepository.save(statistics);

        LoginRequestDTO loginRequest = new LoginRequestDTO(dto.getAccountDetails().getEmail(), dto.getAccountDetails().getPassword());
        return login(loginRequest);
    }

    /**
     * Authenticates a user and returns an authentication response.
     *
     * Steps:
     * - Uses the AuthenticationManager to verify the user's credentials.
     * - On successful authentication, retrieves the CustomUserDetails principal.
     * - Generates a JWT based on the authenticated user's ID.
     * - Returns an AuthResponseDTO containing the JWT for future authenticated requests.
     *
     * @param dto the login request containing the user's email and password
     * @return an AuthResponseDTO containing a JWT for the authenticated session
     */

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
