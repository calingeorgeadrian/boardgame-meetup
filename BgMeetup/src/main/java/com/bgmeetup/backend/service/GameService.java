package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.Game;
import com.bgmeetup.backend.dto.GameDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.GameMapper;
import com.bgmeetup.backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameService {

    private final GameMapper gameMapper;
    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameMapper gameMapper, GameRepository gameRepository) {
        this.gameMapper = gameMapper;
        this.gameRepository = gameRepository;
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
}
