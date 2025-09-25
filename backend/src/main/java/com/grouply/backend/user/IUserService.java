package com.grouply.backend.user;


import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    void updateUser(UpdateUserDTO dto);

    void deleteUser(DeleteUserDTO dto);

    Page<User> findAllUsers(Pageable pageable);

    User findOneUser(Long id);
}
