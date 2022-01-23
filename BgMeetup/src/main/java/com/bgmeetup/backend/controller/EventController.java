package com.bgmeetup.backend.controller;

import com.bgmeetup.backend.dto.EventDto;
import com.bgmeetup.backend.dto.EventParticipantDto;
import com.bgmeetup.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping(path = "/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public EventDto get(@PathVariable String eventId) {
        return eventService.get(eventId);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventDto> getAll() {
        return eventService.getAll();
    }

    @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventDto> create(@Valid @RequestBody EventDto request) {
        eventService.save(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/delete/{eventId}")
    public void delete(@PathVariable String eventId) {
        eventService.delete(eventId);
    }

    @PostMapping(path = "/addParticipant", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventParticipantDto> add(@Valid @RequestBody EventParticipantDto request) {
        eventService.addEventParticipant(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/getEventParticipants/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventParticipantDto> getEventParticipants(@PathVariable String eventId) {
        return eventService.getEventParticipants(eventId);
    }
}