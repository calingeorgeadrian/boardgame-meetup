package com.bgmeetup.backend.mapper;

import com.bgmeetup.backend.domain.Game;
import com.bgmeetup.backend.domain.ProposedGame;
import com.bgmeetup.backend.dto.GameDto;
import com.bgmeetup.backend.dto.ProposedGameDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProposedGameMapper {

    @Mappings({
            @Mapping(target = "eventId", source = "dto.eventId"),
            @Mapping(target = "gameId", source = "dto.gameId"),
            @Mapping(target = "ownerId", source = "dto.ownerId"),
            @Mapping(target = "proposerId", source = "dto.proposerId")
    })
    ProposedGame toEntity(ProposedGameDto dto);

    @Mappings({
            @Mapping(target = "eventId", source = "entity.eventId"),
            @Mapping(target = "gameId", source = "entity.gameId"),
            @Mapping(target = "ownerId", source = "entity.ownerId"),
            @Mapping(target = "proposerId", source = "entity.proposerId")
    })
    ProposedGameDto toEntity(ProposedGame entity);

    List<ProposedGame> toEntityList(List<ProposedGameDto> games);
    List<ProposedGameDto> toDtoList(List<ProposedGame> games);
}
