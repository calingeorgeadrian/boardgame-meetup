package com.bgmeetup.backend.mapper;

import com.bgmeetup.backend.domain.User;
import com.bgmeetup.backend.dto.UserDto;
import com.bgmeetup.backend.dto.UserLoginDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mappings({
            @Mapping(target = "id", source = "dto.id"),
            @Mapping(target = "email", source = "dto.email"),
            @Mapping(target = "firstName", source = "dto.firstName"),
            @Mapping(target = "lastName", source = "dto.lastName"),
            @Mapping(target = "location", source = "dto.location"),
            @Mapping(target = "bggUsername", source = "dto.bggUsername")
    })
    User toEntity(UserDto dto);

    @Mappings({
            @Mapping(target = "firstName", source = "dto.firstName"),
            @Mapping(target = "lastName", source = "dto.lastName"),
            @Mapping(target = "email", source = "dto.email")
    })
    User toEntity(UserLoginDto dto);

    @Mappings({
            @Mapping(target = "id", source = "entity.id"),
            @Mapping(target = "email", source = "entity.email"),
            @Mapping(target = "firstName", source = "entity.firstName"),
            @Mapping(target = "lastName", source = "entity.lastName"),
            @Mapping(target = "location", source = "entity.location"),
            @Mapping(target = "bggUsername", source = "entity.bggUsername")
    })
    UserDto toDto(User entity);
}
