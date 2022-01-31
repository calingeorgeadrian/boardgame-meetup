package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.Event;
import com.bgmeetup.backend.domain.EventParticipant;
import com.bgmeetup.backend.dto.EventDto;
import com.bgmeetup.backend.dto.EventParticipantDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.enums.InviteStatus;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.EventMapper;
import com.bgmeetup.backend.mapper.EventParticipantMapper;
import com.bgmeetup.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        var event = eventRepository.get(eventId).orElseThrow(()-> new EntityNotFoundException("Event"));
        String dateString = event.getDate().toString();
        var dateParts  = dateString.split("T");
        event.setDateString(dateParts[0] + " " + dateParts[1]);
        event.setDate(null);
        var participants = eventRepository.getParticipants(event.getId().toString());
        var participantsCount = participants.size();
        event.setParticipantsCount(participantsCount);
        return event;
    }

    public List<EventDto> getAll(String userId) {
        var events = eventRepository.getAll();
        for (EventDto event : events) {
            String dateString = event.getDate().toString();
            var dateParts  = dateString.split("T");
            event.setDateString(dateParts[0] + " " + dateParts[1]);
            event.setDate(null);
            var host = userService.get(event.getHostId().toString());
            event.setHostName(host.getLastName() + " " + host.getFirstName());
            var participants = eventRepository.getParticipants(event.getId().toString());
            var participantsCount = participants.stream().filter(p -> p.getStatus() == InviteStatus.Accepted.getValue()).count();
            event.setParticipantsCount((int)participantsCount);
            var participant = participants.stream().filter(p -> p.getParticipantId().toString().equals(userId)).findFirst();
            if(participant.isPresent()){
                event.setStatus(participant.get().getStatus());
            }
            else
                event.setStatus(InviteStatus.NotInvited.getValue());
        }

        return events;
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult create(EventDto request) {
        Event event = eventMapper.toEntity(request);
        var eventId = eventRepository.create(event);
        var host = userService.get(request.getHostId().toString());
        var participant = new EventParticipant(eventId, event.getHostId(), event.getHostId(), host.getEmail(), InviteStatus.Accepted.getValue(), false);
        return eventRepository.invite(participant);
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult update(EventDto request) {
        Event event = eventMapper.toEntity(request);
        return eventRepository.update(event);
    }

    public SaveResult join(String eventId, String userId) {
        return eventRepository.join(eventId, userId);
    }

    public SaveResult leave(String eventId, String userId) {
        return eventRepository.leave(eventId, userId);
    }

    public SaveResult cancel(String eventId) {
        return eventRepository.cancel(eventId);
    }

    public SaveResult confirm(String eventId) {
        return eventRepository.confirm(eventId);
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult invite(EventParticipantDto request) {
        var dbParticipant = eventRepository.getParticipant(request.getEventId().toString(), request.getEmail());

        if(request.getParticipantId() == null){
            var user = userService.getByEmail(request.getEmail());
            request.setParticipantId(user.getId());
        }
        else {
            var user = userService.get(request.getParticipantId().toString());
            request.setEmail(user.getEmail());
        }
        EventParticipant participant = eventParticipantMapper.toEntity(request);
        if (dbParticipant.isPresent())
            return eventRepository.acceptInvitation(request.getEventId().toString(), request.getParticipantId().toString());
        else
            return eventRepository.invite(participant);
    }

    public SaveResult acceptInvitation(String eventId, String userId) {
        return eventRepository.acceptInvitation(eventId, userId);
    }

    public SaveResult declineInvitation(String eventId, String userId) {
        return eventRepository.declineInvitation(eventId, userId);
    }

    public List<EventParticipantDto> getParticipants(String eventId) {
        var participants = eventRepository.getParticipants(eventId);
        for (EventParticipantDto participant : participants) {
            var user = userService.get(participant.getParticipantId().toString());
            if(participant.getParticipantName() == null)
                participant.setParticipantName(user.getEmail());
            else
                participant.setParticipantName(user.getLastName() + " " + user.getFirstName());
        }

        return participants;
    }
}
