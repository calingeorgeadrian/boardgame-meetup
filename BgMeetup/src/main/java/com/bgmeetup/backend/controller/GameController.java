package com.bgmeetup.backend.controller;

import com.bgmeetup.backend.dto.GameDto;
import com.bgmeetup.backend.dto.ProposedGameDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(path = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDto> get(@PathVariable String id) {
        GameDto game = gameService.get(id);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping(path = "/collection/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GameDto> getCollection(@PathVariable String userId) {
        return gameService.getCollection(userId);
    }

    @PostMapping(path = "/import/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult importGames(@PathVariable String userId, @Valid @RequestBody List<GameDto> requests) {
        return gameService.importGames(userId, requests);
    }

    @PostMapping(path = "/proposeGames/eventId={eventId}/userId={userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SaveResult proposeGames(@PathVariable String eventId, @PathVariable String userId, @Valid @RequestBody List<ProposedGameDto> requests) {
        return gameService.proposeGames(eventId, userId, requests);
    }

    @GetMapping(path = "/getProposedGames/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProposedGameDto> getProposedGames(@PathVariable String eventId) {
        return gameService.getProposedGames(eventId);
    }
}
