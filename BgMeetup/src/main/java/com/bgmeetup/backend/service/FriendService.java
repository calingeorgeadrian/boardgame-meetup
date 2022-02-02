package com.bgmeetup.backend.service;

import com.bgmeetup.backend.dto.FriendDto;
import com.bgmeetup.backend.dto.FriendInvitationDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.dto.UserDto;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.FriendMapper;
import com.bgmeetup.backend.repository.FriendRepository;
import com.bgmeetup.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class FriendService {
    private final FriendMapper friendMapper;
    private FriendRepository friendRepository;
    private UserRepository userRepository;


    public FriendService(
            FriendMapper friendMapper,
            FriendRepository friendRepository,
            UserRepository userRepository
    ) {
        this.friendMapper = friendMapper;
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }

    public List<FriendDto> getFriends(String userId) {
        return friendRepository.getFriends(userId);
    }

    public SaveResult sendFriendRequest(String userId, String email) {
        UserDto userDto = userRepository.getByEmail(email).orElseThrow(()-> new EntityNotFoundException("User"));
        return friendRepository.sendFriendRequest(userId, userDto.getId().toString());
    }

    public List<FriendInvitationDto> getFriendRequestsReceived(String userId) {
        List<String> senderIds = friendRepository.getSenderIdsForReceivedFriendRequests(userId);
        if (senderIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<UserDto> userDtoList = userRepository.getByIds(senderIds);
        return friendMapper.toDtoList(userDtoList);
    }

    public List<FriendInvitationDto> getFriendRequestsSent(String userId) {
        List<String> senderIds = friendRepository.getReceiverIdsForSentFriendRequests(userId);
        if (senderIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<UserDto> userDtoList = userRepository.getByIds(senderIds);
        return friendMapper.toDtoList(userDtoList);
    }
}
