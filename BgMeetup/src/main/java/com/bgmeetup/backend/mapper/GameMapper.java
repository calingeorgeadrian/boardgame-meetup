package com.bgmeetup.backend.mapper;

import com.bgmeetup.backend.domain.Game;
import com.bgmeetup.backend.dto.GameDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GameMapper {

    @Mappings({
            @Mapping(target = "id", source = "dto.id"),
            @Mapping(target = "title", source = "dto.title"),
            @Mapping(target = "description", source = "dto.description"),
            @Mapping(target = "minPlayers", source = "dto.minPlayers"),
            @Mapping(target = "maxPlayers", source = "dto.maxPlayers"),
            @Mapping(target = "playingTime", source = "dto.playingTime")
    })
    Game toEntity(GameDto dto);

    @Mappings({
            @Mapping(target = "id", source = "entity.id"),
            @Mapping(target = "title", source = "entity.title"),
            @Mapping(target = "description", source = "entity.description"),
            @Mapping(target = "minPlayers", source = "entity.minPlayers"),
            @Mapping(target = "maxPlayers", source = "entity.maxPlayers"),
            @Mapping(target = "playingTime", source = "entity.playingTime")
    })
    GameDto toDto(Game entity);

    List<Game> toEntityList(List<GameDto> games);
    List<GameDto> toDtoList(List<Game> games);
}
