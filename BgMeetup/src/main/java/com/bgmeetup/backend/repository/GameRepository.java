package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.Game;
import com.bgmeetup.backend.dto.GameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GameRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<GameDto> get(String id) {
        String sql = "SELECT * FROM game WHERE id = ?";
        RowMapper<GameDto> mapper = getGameRowMapper();
        return jdbcTemplate.query(sql, mapper, id).stream().findFirst();
    }

    public List<GameDto> getAll() {
        String sql = "SELECT * FROM game ORDER BY title";
        RowMapper<GameDto> mapper = getGameRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    public void save(Game game) {
        String sql = "INSERT INTO game VALUES(?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, UUID.randomUUID().toString());
            preparedStatement.setString(2, game.getTitle());
            if(game.getDescription() != null)
                preparedStatement.setString(3, game.getDescription());
            else
                preparedStatement.setObject(3, null);
            preparedStatement.setInt(4, game.getMinPlayers());
            preparedStatement.setInt(5, game.getMaxPlayers());
            preparedStatement.setInt(6, game.getPlayingTime());
            return preparedStatement;
        });
    }

    public void update(Game game) {
        String sql = "UPDATE game SET title = ?, description = ?, minPlayers = ?," +
                "maxPlayers = ?, playingTime = ? WHERE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, game.getTitle());
            preparedStatement.setString(2, game.getDescription());
            preparedStatement.setInt(3, game.getMinPlayers());
            preparedStatement.setInt(4, game.getMaxPlayers());
            preparedStatement.setInt(5, game.getPlayingTime());
            preparedStatement.setObject(6, game.getId().toString());
            return preparedStatement;
        });
    }

    public void delete(String id) {
        String sql = "DELETE FROM game WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private RowMapper<GameDto> getGameRowMapper() {
        return (resultSet, i) -> new GameDto(
                UUID.fromString(resultSet.getString("id")),
                resultSet.getString("title"),
                resultSet.getString("description"),
                resultSet.getInt("minPlayers"),
                resultSet.getInt("maxPlayers"),
                resultSet.getInt("playingTime")
        );
    }
}
