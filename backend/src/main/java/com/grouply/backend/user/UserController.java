package com.grouply.backend.user;

import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public Page<User> allUsers(Pageable pageable) {
        return userService.findAllUsers(pageable);
    }

    @GetMapping("/{id}")
    public User oneUser(@PathVariable Long id) {
        return userService.findOneUser(id);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody UpdateUserDTO dto) {
        userService.updateUser(dto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@RequestBody DeleteUserDTO dto) {
        userService.deleteUser(dto);
    }




}
