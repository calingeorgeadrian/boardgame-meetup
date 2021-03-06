package com.bgmeetup.backend.controller;

import com.bgmeetup.backend.domain.Feedback;
import com.bgmeetup.backend.dto.*;
import com.bgmeetup.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public SaveResult create(@RequestBody EventDto request) {
        return eventService.create(request);
    }

    @PostMapping(path = "/update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult update(@RequestBody EventDto request){
        return eventService.update(request);
    }

    @GetMapping(path = "/cancel/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult cancel(@PathVariable String eventId) {
        return eventService.cancel(eventId);
    }

    @GetMapping(path = "/join/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult join(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.join(eventId, userId);
    }

    @GetMapping(path = "/leave/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult leave(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.leave(eventId, userId);
    }

    @GetMapping(path = "/getParticipants/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventParticipantDto> getEventParticipants(@PathVariable String eventId) {
        return eventService.getParticipants(eventId);
    }

    @PostMapping(path = "/invite", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult invite(@Valid @RequestBody EventParticipantDto request) {
        return eventService.invite(request);
    }

    @GetMapping(path = "/acceptInvitation/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult acceptInvitation(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.acceptInvitation(eventId, userId);
    }

    @GetMapping(path = "/declineInvitation/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult declineInvitation(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.declineInvitation(eventId, userId);
    }

    @GetMapping(path = "/checkIn/eventId={eventId}/userId={userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult checkIn(@PathVariable String eventId, @PathVariable String userId) {
        return eventService.checkIn(eventId, userId);
    }

    @GetMapping(path = "/confirm/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult confirm(@PathVariable String eventId) {
        return eventService.confirm(eventId);
    }

    @PostMapping(path = "/submitLeaderboard", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult submitLeaderboard(@Valid @RequestBody List<LeaderboardScoreDto> requests) {
        return eventService.submitLeaderboard(requests);
    }

    @GetMapping(path = "/getLeaderboard/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<LeaderboardScoreDto> getLeaderboard(@PathVariable String eventId) {
        return eventService.getLeaderboard(eventId);
    }

    @PostMapping(path = "/submitFeedback", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult submitFeedback(@Valid @RequestBody List<Feedback> requests) {
        return eventService.submitFeedback(requests);
    }

    @GetMapping(path = "/getFeedback/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Feedback> getFeedback(@PathVariable String eventId) {
        return eventService.getFeedback(eventId);
    }
}