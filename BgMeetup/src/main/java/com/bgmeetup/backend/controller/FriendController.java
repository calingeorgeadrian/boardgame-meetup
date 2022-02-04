package com.bgmeetup.backend.controller;

import com.bgmeetup.backend.dto.FriendDto;
import com.bgmeetup.backend.dto.FriendInvitationDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.mapper.FriendMapper;
import com.bgmeetup.backend.service.FriendService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/friends")
public class FriendController {
    private FriendService friendService;
    private FriendMapper friendMapper;

    public FriendController(FriendService friendService, FriendMapper friendMapper) {
        this.friendService = friendService;
        this.friendMapper = friendMapper;
    }

    @GetMapping(path="/getFriends/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FriendDto> getFriends(@PathVariable String userId) {
        List<FriendDto> f = friendService.getFriends(userId);
        return f;
    }

    @PostMapping(path="/friendRequest/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult sendFriendRequest(@PathVariable String userId, @RequestBody String email) {
        return friendService.sendFriendRequest(userId, email);
    }

    @GetMapping(path="/friendRequestsReceived/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FriendInvitationDto> getFriendRequestsReceived(@PathVariable String userId) {
        return friendService.getFriendRequestsReceived(userId);
    }

    @GetMapping(path="/friendRequestsSent/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FriendInvitationDto> getFriendRequestsSent(@PathVariable String userId) {
        return friendService.getFriendRequestsSent(userId);
    }

    @GetMapping(path="/friendRequests/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FriendInvitationDto> getFriendRequests(@PathVariable String userId) {
        List<FriendInvitationDto> friendInvitationDtoList = new ArrayList<>();
        friendInvitationDtoList.addAll(friendService.getFriendRequestsSent(userId));
        friendInvitationDtoList.addAll(friendService.getFriendRequestsReceived(userId));
        return friendInvitationDtoList;
    }

    @GetMapping(value = "friendRequest/{senderId}/accept/{receiverId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FriendDto> acceptFriendRequest(@PathVariable String senderId, @PathVariable String receiverId) {
        friendService.acceptFriendRequest(senderId, receiverId);
        return friendService.getFriends(senderId);
    }

    @DeleteMapping(value = "friendRequest/{senderId}/decline/{receiverId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void declineFriendRequest(@PathVariable String senderId, @PathVariable String receiverId) {
        friendService.declineFriendRequest(senderId, receiverId);
    }

    @DeleteMapping(value = "{senderId}/remove/{receiverId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void removeFriend(@PathVariable String senderId, @PathVariable String receiverId) {
        friendService.removeFriend(senderId, receiverId);
    }
}
