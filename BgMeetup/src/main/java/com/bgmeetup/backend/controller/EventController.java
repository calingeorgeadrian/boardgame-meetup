package com.bgmeetup.backend.controller;

import com.bgmeetup.backend.dto.EventDto;
import com.bgmeetup.backend.dto.EventParticipantDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping(path = "/get/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public EventDto get(@PathVariable String eventId) {
        return eventService.get(eventId);
    }

    @GetMapping(path = "/all/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventDto> getAll(@PathVariable String userId) {
        return eventService.getAll(userId);
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult create(@RequestBody EventDto request) throws ParseException {
        return eventService.create(request);
    }

    @PostMapping(path = "/update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult update(@RequestBody EventDto request){
        return eventService.update(request);
    }

    @GetMapping(path = "/join/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult join(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.join(eventId, userId);
    }

    @GetMapping(path = "/leave/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult leave(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.leave(eventId, userId);
    }

    @GetMapping(path = "/cancel/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult cancel(@PathVariable String eventId) {
        return eventService.cancel(eventId);
    }

    @GetMapping(path = "/confirm/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult confirm(@PathVariable String eventId) {
        return eventService.confirm(eventId);
    }

    @PostMapping(path = "/invite", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventParticipantDto> invite(@Valid @RequestBody EventParticipantDto request) {
        eventService.invite(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/getParticipants/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventParticipantDto> getEventParticipants(@PathVariable String eventId) {
        return eventService.getParticipants(eventId);
    }
}