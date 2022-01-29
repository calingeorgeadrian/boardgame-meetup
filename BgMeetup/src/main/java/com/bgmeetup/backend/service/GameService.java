package com.bgmeetup.backend.service;

import com.bgmeetup.backend.domain.Game;
import com.bgmeetup.backend.dto.GameDto;
import com.bgmeetup.backend.exceptions.EntityNotFoundException;
import com.bgmeetup.backend.mapper.GameMapper;
import com.bgmeetup.backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public List<GameDto> getAll() {
        return gameRepository.getAll();
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(GameDto request) {
        Game game = gameMapper.toEntity(request);
        gameRepository.save(game);
    }

    public void update(GameDto request) {
        Game game = gameMapper.toEntity(request);
        gameRepository.update(game);
    }
}
