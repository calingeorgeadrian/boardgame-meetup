package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.User;
import com.bgmeetup.backend.dto.UserDto;
import com.bgmeetup.backend.dto.UserLoginDto;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.UserMapper;
import com.bgmeetup.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;

@Service
public class AuthService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public void register(UserLoginDto request) {
        User user = userMapper.toEntity(request);

        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        user.setPasswordSalt(salt);
        KeySpec spec = new PBEKeySpec(request.getPassword().toCharArray(), salt, 65536, 128);
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            user.setPasswordHash(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        }
        userRepository.register(user);
    }

    public UserDto login(UserLoginDto request) {
        UserDto user = userRepository.login(request).orElseThrow(()-> new EntityNotFoundException("User"));
        KeySpec spec = new PBEKeySpec(request.getPassword().toCharArray(), user.getPasswordSalt(), 65536, 128);
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();

            if(Arrays.equals(hash, user.getPasswordHash()))
                return user;
            else return null;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        }
        return null;
    }
}
