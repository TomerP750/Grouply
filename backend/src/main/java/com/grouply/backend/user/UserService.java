package com.grouply.backend.user;

import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
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
    public void updateUser(UpdateUserDTO dto) {

    }

    @Override
    public void deleteUser(DeleteUserDTO dto) {

    }

    @Override
    public Page<User> findAllUsers(Pageable pageable) {
        return userRepository.findAll(PageRequest.of(0, 5));
    }

    @Override
    public User findOneUser(Long id) {
        log.info("getting user");
        return userRepository.findById(id).orElseThrow(()->new NoSuchElementException("User not found"));
    }
}
