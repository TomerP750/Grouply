package com.grouply.backend.user;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.user.Dtos.ChangePasswordRequestDTO;
import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Override
    public void updateUser(Long userId ,UpdateUserDTO dto) throws ExistsException {

        User user = findOneUser(userId);

        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new ExistsException("Username already in use");
        }

        if (userRepository.existsByEmailIgnoreCaseAndIdNot(dto.getEmail(), user.getId())) {
            throw new ExistsException("Email already in use");
        }

        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setAvatarUrl(user.getAvatarUrl());
        userRepository.save(user);
    }

    public void changePassword(Long userId, ChangePasswordRequestDTO dto) throws InvalidInputException {

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new InvalidInputException("Passwords do not match");
        }

        User user = findOneUser(userId);
        String encodedPassword = encoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId ,DeleteUserDTO dto) throws InvalidInputException {

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new InvalidInputException("Passwords are not match");
        }
        User user = findOneUser(userId);
        if (!user.getPassword().equals(dto.getPassword())) {
            throw new InvalidInputException("Password is wrong");
        }

        log.info("Deleting user");
        userRepository.deleteById(user.getId());
        log.info("Successfully deleted user");
    }

    public Page<UserDTO> searchUsers(String query, Pageable pageable) {
        return userRepository.search(query ,pageable).map(EntityToDtoMapper::toUserDto);
    }

    @Override
    public Page<UserDTO> findAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(EntityToDtoMapper::toUserDto);
    }

    @Override
    public User findOneUser(Long id) {
        log.info("getting user");
        return userRepository.findById(id).orElseThrow(()->new NoSuchElementException("User not found"));
    }

    public User findByUserName(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public boolean checkUsernameAvailability(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean isAdmin(Long userId) {
        return userRepository.existsByIdAndRole(userId, Role.ADMIN);
    }
}
