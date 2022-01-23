package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.Event;
import com.bgmeetup.backend.domain.EventParticipant;
import com.bgmeetup.backend.dto.EventDto;
import com.bgmeetup.backend.dto.EventParticipantDto;
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

    @Autowired
    public EventService(EventMapper eventMapper, EventRepository eventRepository, EventParticipantMapper eventParticipantMapper) {
        this.eventMapper = eventMapper;
        this.eventRepository = eventRepository;
        this.eventParticipantMapper = eventParticipantMapper;
    }

    public EventDto get(String id) {
        return eventRepository.get(id).orElseThrow(()-> new EntityNotFoundException("Event"));
    }

    public List<EventDto> getAll() {
        return eventRepository.getAll();
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
