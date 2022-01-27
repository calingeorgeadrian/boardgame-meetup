package com.bgmeetup.backend.mapper;

import com.bgmeetup.backend.domain.Event;
import com.bgmeetup.backend.dto.EventDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface EventMapper {

    @Mappings({
            @Mapping(target = "id", source = "dto.id"),
            @Mapping(target = "hostId", source = "dto.hostId"),
            @Mapping(target = "title", source = "dto.title"),
            @Mapping(target = "location", source = "dto.location"),
            @Mapping(target = "reqNumberOfPlayers", source = "dto.reqNumberOfPlayers"),
            @Mapping(target = "date", source = "dto.date")
    })
    Event toEntity(EventDto dto);

    @Mappings({
            @Mapping(target = "id", source = "entity.id"),
            @Mapping(target = "hostId", source = "entity.hostId"),
            @Mapping(target = "title", source = "entity.title"),
            @Mapping(target = "location", source = "entity.location"),
            @Mapping(target = "reqNumberOfPlayers", source = "entity.reqNumberOfPlayers"),
            @Mapping(target = "date", source = "entity.date")
    })
    EventDto toDto(Event entity);
}
