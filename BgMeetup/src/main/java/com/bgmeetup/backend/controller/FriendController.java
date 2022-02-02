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
        return friendService.getFriends(userId);
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
}
