package com.bgmeetup.backend.mapper;

import com.bgmeetup.backend.domain.EventParticipant;
import com.bgmeetup.backend.dto.EventParticipantDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface EventParticipantMapper {

    @Mappings({
            @Mapping(target = "eventId", source = "dto.eventId"),
            @Mapping(target = "participantId", source = "dto.participantId")
    })
    EventParticipant toEntity(EventParticipantDto dto);

    @Mappings({
            @Mapping(target = "eventId", source = "entity.eventId"),
            @Mapping(target = "participantId", source = "entity.participantId")
    })
    EventParticipantDto toEntity(EventParticipant entity);
}