package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.Game;
import com.bgmeetup.backend.domain.ProposedGame;
import com.bgmeetup.backend.domain.Vote;
import com.bgmeetup.backend.dto.GameDto;
import com.bgmeetup.backend.dto.ProposedGameDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.GameMapper;
import com.bgmeetup.backend.mapper.ProposedGameMapper;
import com.bgmeetup.backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameService {

    private final GameMapper gameMapper;
    private final GameRepository gameRepository;
    private final ProposedGameMapper proposedGameMapper;
    private final UserService userService;

    @Autowired
    public GameService(GameMapper gameMapper, GameRepository gameRepository, ProposedGameMapper proposedGameMapper, UserService userService) {
        this.gameMapper = gameMapper;
        this.gameRepository = gameRepository;
        this.proposedGameMapper = proposedGameMapper;
        this.userService = userService;
    }

    public GameDto get(String id) {
        return gameRepository.get(id).orElseThrow(()-> new EntityNotFoundException("Game"));
    }

    public List<GameDto> getCollection(String userId) {
        return gameRepository.getCollection(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult importGames(String userId, List<GameDto> requests) {
        List<Game> games = gameMapper.toEntityList(requests);
        return gameRepository.importGames(userId, games);
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult proposeGames(String eventId, String userId, List<ProposedGameDto> requests) {
        var clearResult = gameRepository.clearProposals(eventId, userId);
        if(requests.size() > 0){
            List<ProposedGame> games = proposedGameMapper.toEntityList(requests);
            return gameRepository.proposeGames(games);
        }
        else return clearResult;
    }

    public List<ProposedGameDto> getProposedGames(String eventId) {
        var proposedGames = gameRepository.getProposedGames(eventId);
        var votes = gameRepository.getVotedGames(eventId);
        for (ProposedGameDto proposedGame : proposedGames) {
            var game = gameRepository.get(proposedGame.getGameId().toString());
            proposedGame.setBggId(game.get().getBggId());
            proposedGame.setTitle(game.get().getTitle());
            proposedGame.setImageUrl(game.get().getImageUrl());
            var votesCount = votes.stream().filter(v -> v.getGameId().equals(proposedGame.getGameId())).count();
            proposedGame.setVotes((int)votesCount);
            var proposer = userService.get(proposedGame.getProposerId().toString());
            proposedGame.setProposerName(proposer.getLastName() + " " + proposer.getFirstName());
            var owner = userService.get(proposedGame.getOwnerId().toString());
            proposedGame.setOwnerName(owner.getLastName() + " " + owner.getFirstName());
        }

        return proposedGames;
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult voteGames(String eventId, String userId, List<Vote> requests) {
        var clearResult = gameRepository.clearVotes(eventId, userId);
        if(requests.size() > 0){
            return gameRepository.voteGames(requests);
        }
        else return clearResult;
    }

    public List<Vote> getVotedGames(String eventId) {
        return gameRepository.getVotedGames(eventId);
    }

    @Transactional(rollbackFor = Exception.class)
    public SaveResult chooseGames(String eventId, List<ProposedGameDto> requests) {
        var clearResult = gameRepository.clearChosenGames(eventId);
        if(requests.size() > 0){
            return gameRepository.chooseGames(requests);
        }
        else return clearResult;
    }
}
