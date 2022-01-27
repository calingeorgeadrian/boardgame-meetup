package com.bgmeetup.backend.controller;

import com.bgmeetup.backend.domain.User;
import com.bgmeetup.backend.dto.UserDto;
import com.bgmeetup.backend.mapper.UserMapper;
import com.bgmeetup.backend.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;
    private UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping(path = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDto get(@PathVariable String id) {
        return userService.get(id);
    }

    @PutMapping(path = "/update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDto update(@Valid @RequestBody UserDto request) {
        User user = userMapper.toEntity(request);
        return userService.update(user);
    }
}
