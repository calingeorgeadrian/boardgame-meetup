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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

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
        List<FriendInvitationDto> friendInvitationDtoList = new ArrayList<>();
        for (String senderId : senderIds) {
            UserDto user = userRepository.get(senderId).orElseThrow(()-> new EntityNotFoundException("User"));
            friendInvitationDtoList.add(new FriendInvitationDto(
                    UUID.randomUUID(),
                    user.getId(),
                    UUID.fromString(userId),
                    user.getEmail(),
                    user.getFirstName() + " " + user.getLastName()
            ));
        }
        return friendInvitationDtoList;
    }

    public List<FriendInvitationDto> getFriendRequestsSent(String userId) {
        List<String> receiverIds = friendRepository.getReceiverIdsForSentFriendRequests(userId);
        if (receiverIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<FriendInvitationDto> friendInvitationDtoList = new ArrayList<>();
        for (String receiverId : receiverIds) {
            UserDto user = userRepository.get(receiverId).orElseThrow(()-> new EntityNotFoundException("User"));
            friendInvitationDtoList.add(new FriendInvitationDto(
                    UUID.randomUUID(),
                    UUID.fromString(userId),
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName() + " " + user.getLastName()
            ));
        }
        return friendInvitationDtoList;
    }

    public void acceptFriendRequest(String userId, String friendId) {
        UserDto friend = userRepository.get(friendId).orElseThrow(()-> new EntityNotFoundException("User"));
        String friendName = friend.getFirstName() + " " + friend.getLastName();
        UserDto user = userRepository.get(userId).orElseThrow(()-> new EntityNotFoundException("User"));
        String userName = user.getFirstName() + " " + user.getLastName();
        friendRepository.acceptFriendRequest(userId, friendId, userName, friendName);
        friendRepository.declineFriendRequest(userId, friendId);

    }

    public void declineFriendRequest(String senderId, String receiverId) {
//        UserDto userDto = userRepository.getByEmail(receiverId).orElseThrow(()-> new EntityNotFoundException("User"));
        friendRepository.declineFriendRequest(senderId, receiverId);
    }

    public void removeFriend(String userId1, String userId2) {
        friendRepository.removeFriend(userId1, userId2);
    }
}
