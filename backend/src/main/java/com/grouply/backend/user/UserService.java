package com.grouply.backend.user;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {

    private final UserRepository userRepository;

    @Override
    public void updateUser(Long userId ,UpdateUserDTO dto) throws ExistsException {

        User user = findOneUser(userId);

        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new ExistsException("Email already in use");
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ExistsException("Username already in use");
        }

        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setAvatarUrl(user.getAvatarUrl());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(DeleteUserDTO dto) {

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

    public boolean isAdmin(Long userId) {
        return userRepository.existsByIdAndRole(userId, Role.ADMIN);
    }
}
