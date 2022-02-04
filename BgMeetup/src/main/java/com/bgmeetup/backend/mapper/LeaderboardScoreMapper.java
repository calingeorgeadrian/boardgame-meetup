package com.bgmeetup.backend.mapper;


import com.bgmeetup.backend.domain.LeaderboardScore;
import com.bgmeetup.backend.dto.LeaderboardScoreDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LeaderboardScoreMapper {

    @Mappings({
            @Mapping(target = "eventId", source = "dto.eventId"),
            @Mapping(target = "gameId", source = "dto.gameId"),
            @Mapping(target = "participantId", source = "dto.participantId"),
            @Mapping(target = "score", source = "dto.score")
    })
    LeaderboardScore toEntity(LeaderboardScoreDto dto);

    @Mappings({
            @Mapping(target = "eventId", source = "entity.eventId"),
            @Mapping(target = "gameId", source = "entity.gameId"),
            @Mapping(target = "participantId", source = "entity.participantId"),
            @Mapping(target = "score", source = "entity.score")
    })
    LeaderboardScoreDto toEntity(LeaderboardScore entity);

    List<LeaderboardScore> toEntityList(List<LeaderboardScoreDto> games);
    List<LeaderboardScoreDto> toDtoList(List<LeaderboardScore> games);
}
