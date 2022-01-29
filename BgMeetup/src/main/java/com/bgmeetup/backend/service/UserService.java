package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.User;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.dto.UserDto;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.UserMapper;
import com.bgmeetup.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserMapper userMapper;
    private UserRepository userRepository;

    public UserService(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    public UserDto get(String id) {
        return userRepository.get(id).orElseThrow(()-> new EntityNotFoundException("User"));
    }

    public SaveResult update(User user) {
        return userRepository.update(user);
    }
}
