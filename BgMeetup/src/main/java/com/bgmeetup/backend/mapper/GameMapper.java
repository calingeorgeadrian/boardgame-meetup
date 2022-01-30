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
            @Mapping(target = "bggId", source = "dto.bggId"),
            @Mapping(target = "title", source = "dto.title"),
            @Mapping(target = "type", source = "dto.type"),
            @Mapping(target = "imageUrl", source = "dto.imageUrl"),
            @Mapping(target = "description", source = "dto.description"),
            @Mapping(target = "minPlayers", source = "dto.minPlayers"),
            @Mapping(target = "maxPlayers", source = "dto.maxPlayers"),
            @Mapping(target = "minPlayTime", source = "dto.minPlayTime"),
            @Mapping(target = "maxPlayTime", source = "dto.maxPlayTime"),
            @Mapping(target = "complexity", source = "dto.complexity"),
            @Mapping(target = "year", source = "dto.year")
    })
    Game toEntity(GameDto dto);

    @Mappings({
            @Mapping(target = "id", source = "entity.id"),
            @Mapping(target = "bggId", source = "entity.bggId"),
            @Mapping(target = "title", source = "entity.title"),
            @Mapping(target = "type", source = "entity.type"),
            @Mapping(target = "imageUrl", source = "entity.imageUrl"),
            @Mapping(target = "description", source = "entity.description"),
            @Mapping(target = "minPlayers", source = "entity.minPlayers"),
            @Mapping(target = "maxPlayers", source = "entity.maxPlayers"),
            @Mapping(target = "minPlayTime", source = "entity.minPlayTime"),
            @Mapping(target = "maxPlayTime", source = "entity.maxPlayTime"),
            @Mapping(target = "complexity", source = "entity.complexity"),
            @Mapping(target = "year", source = "entity.year")
    })
    GameDto toDto(Game entity);

    List<Game> toEntityList(List<GameDto> games);
    List<GameDto> toDtoList(List<Game> games);
}
