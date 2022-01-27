package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.Event;
import com.bgmeetup.backend.domain.EventParticipant;
import com.bgmeetup.backend.dto.EventDto;
import com.bgmeetup.backend.dto.EventParticipantDto;
import com.bgmeetup.backend.enums.InviteStatus;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.EventMapper;
import com.bgmeetup.backend.mapper.EventParticipantMapper;
import com.bgmeetup.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService {

    private final EventMapper eventMapper;
    private final EventRepository eventRepository;
    private final EventParticipantMapper eventParticipantMapper;
    private final UserService userService;

    @Autowired
    public EventService(EventMapper eventMapper, EventRepository eventRepository, EventParticipantMapper eventParticipantMapper, UserService userService) {
        this.eventMapper = eventMapper;
        this.eventRepository = eventRepository;
        this.eventParticipantMapper = eventParticipantMapper;
        this.userService = userService;
    }

    public EventDto get(String eventId) {
        return eventRepository.get(eventId).orElseThrow(()-> new EntityNotFoundException("Event"));
    }

    public List<EventDto> getAll(String userId) {
        var events = eventRepository.getAll(userId);
        for (EventDto event : events) {
            var host = userService.get(event.getHostId().toString());
            event.setHostName(host.getLastName() + " " + host.getFirstName());
            var participants = eventRepository.getEventParticipants(event.getId().toString());
            var participantsCount = participants.stream().count();
            event.setParticipantsCount((int)participantsCount);
            var participant = participants.stream().filter(p -> p.getParticipantId().toString().equals(userId)).findAny();
            if(participant.isPresent()){
                var inviter = userService.get(participant.get().getInviterId().toString());
                event.setInvitedBy(inviter.getLastName() + " " + inviter.getFirstName());
                event.setStatus(InviteStatus.Invited.getValue());
            }
        }

        return events;
    }

    @Transactional(rollbackFor = Exception.class)
    public void save(EventDto request) {
        Event event = eventMapper.toEntity(request);
        eventRepository.save(event);
    }

    public void delete(String id) {
        eventRepository.delete(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void addEventParticipant(EventParticipantDto request) {
        EventParticipant participant = eventParticipantMapper.toEntity(request);
        eventRepository.addEventParticipant(participant);
    }

    public List<EventParticipantDto> getEventParticipants(String eventId) {
        return eventRepository.getEventParticipants(eventId);
    }
}
