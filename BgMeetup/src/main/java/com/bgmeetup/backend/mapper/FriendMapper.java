package com.bgmeetup.backend.mapper;

import com.bgmeetup.backend.domain.Friend;
import com.bgmeetup.backend.dto.FriendDto;
import com.bgmeetup.backend.dto.FriendInvitationDto;
import com.bgmeetup.backend.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface FriendMapper {

    @Mappings({
            @Mapping(target = "friendId", source = "dto.friendId"),
            @Mapping(target = "name", source = "dto.name")
    })
    Friend toEntity(FriendDto dto);

    @Mappings({
            @Mapping(target = "friendId", source = "entity.friendId"),
            @Mapping(target = "name", source = "entity.name")
    })
    FriendDto toDto(Friend entity);

    @Mappings({
            @Mapping(target = "id", source = "dto.id"),
            @Mapping(target = "email", source = "dto.email"),
            @Mapping(target = "firstName", source = "dto.name"),
//            @Mapping(target = "senderId", source = "senderId"),
            @Mapping(target = "receiverId", source = "dto.id"),
    })
    List<FriendInvitationDto> toDtoListForRequestSent(List<UserDto> dto);

    @Mappings({
            @Mapping(target = "id", source = "dto.id"),
            @Mapping(target = "email", source = "dto.email"),
            @Mapping(target = "firstName", source = "dto.name"),
            @Mapping(target = "senderId", source = "dto.id"),
//            @Mapping(target = "receiverId", source = "receiverId"),
    })
    List<FriendInvitationDto> toDtoListForRequestReceived(List<UserDto> dto);
}
