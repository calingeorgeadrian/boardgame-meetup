package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.*;
import com.bgmeetup.backend.dto.GameDto;
import com.bgmeetup.backend.dto.ProposedGameDto;
import com.bgmeetup.backend.dto.SaveResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public Optional<GameDto> getByBGGId(Long bggId) {
        String sql = "SELECT * FROM game WHERE bggId = ?";
        RowMapper<GameDto> mapper = getGameRowMapper();
        return jdbcTemplate.query(sql, mapper, bggId).stream().findFirst();
    }

    public List<GameDto> getCollection(String userId) {
        String collectionItemsQuery = "SELECT * FROM collection WHERE userId = ?";
        RowMapper<CollectionItem> collectionItemMapper = getCollectionItemRowMapper();
        var collectionItems = jdbcTemplate.query(collectionItemsQuery, collectionItemMapper, userId);
        String sql = "SELECT * FROM game ORDER BY title";
        RowMapper<GameDto> gameMapper = getGameRowMapper();
        var games = jdbcTemplate.query(sql, gameMapper);

        return games.stream().filter(g -> collectionItems.stream().anyMatch(c -> c.gameBggId.equals(g.getBggId()))).collect(Collectors.toList());
    }

    public Optional<CollectionItem> getCollectionItem(String userId, Long bggGameId) {
        String sql = "SELECT * FROM collection WHERE userId = '" + userId + "' && gameBggId = " + bggGameId;
        RowMapper<CollectionItem> mapper = getCollectionItemRowMapper();
        return jdbcTemplate.query(sql, mapper).stream().findFirst();
    }

    public SaveResult importGames(String userId, List<Game> games) {
        String sql = "INSERT INTO game VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE bggId = bggId";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            int i = 0;
            var newGameFound = false;

            for (Game game : games) {
                var dbGame = getByBGGId(game.getBggId());
                if(dbGame.isEmpty()) {
                    newGameFound = true;
                    preparedStatement.setObject(1, UUID.randomUUID().toString());
                    if(game.getBggId() != null)
                        preparedStatement.setLong(2, game.getBggId());
                    else
                        preparedStatement.setObject(2, null);
                    preparedStatement.setString(3, game.getTitle());
                    preparedStatement.setString(4, game.getType());
                    if(game.getImageUrl() != null)
                        preparedStatement.setString(5, game.getImageUrl());
                    else
                        preparedStatement.setObject(5, null);
                    if(game.getDescription() != null)
                        preparedStatement.setString(6, game.getDescription());
                    else
                        preparedStatement.setObject(6, null);
                    preparedStatement.setLong(7, game.getMinPlayers());
                    preparedStatement.setInt(8, game.getMaxPlayers());
                    preparedStatement.setInt(9, game.getMinPlayTime());
                    preparedStatement.setInt(10, game.getMaxPlayTime());
                    preparedStatement.setFloat(11, game.getComplexity());
                    preparedStatement.setInt(12, game.getYear());
                    preparedStatement.addBatch();
                }
                i++;

                if (newGameFound && (i % 1000 == 0 || i == games.size())) {
                    preparedStatement.executeBatch();
                }
            }

            return preparedStatement;
        });

        updateCollection(userId, games);

        return new SaveResult(true, null);
    }

    public void updateCollection(String userId, List<Game> games) {
        String sql = "INSERT INTO collection VALUES(?, ?) " +
                     "ON DUPLICATE KEY UPDATE gameBggId = gameBggId";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            int i = 0;

            for (Game game : games) {
                var dbGame = getCollectionItem(userId, game.getBggId());
                if(dbGame.isEmpty()) {
                    preparedStatement.setObject(1, userId);
                    preparedStatement.setLong(2, game.getBggId());
                    preparedStatement.addBatch();
                }
                i++;

                if (i % 1000 == 0 || i == games.size()) {
                    preparedStatement.executeBatch();
                }
            }

            return preparedStatement;
        });
    }

    public SaveResult proposeGames(List<ProposedGame> games) {
        String sql = "INSERT INTO proposed_game VALUES(?, ?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE gameId = gameId";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            int i = 0;
            for (ProposedGame game : games) {

                preparedStatement.setObject(1, game.getEventId().toString());
                preparedStatement.setObject(2, game.getGameId().toString());
                preparedStatement.setObject(3, game.getOwnerId().toString());
                preparedStatement.setObject(4, game.getProposerId().toString());

                preparedStatement.addBatch();

                i++;

                if (i % 1000 == 0 || i == games.size()) {
                    preparedStatement.executeBatch();
                }
            }

            return preparedStatement;
        });

        return new SaveResult(true, null);
    }

    public SaveResult clearProposals(String eventId, String userId){
        String sql = "DELETE FROM proposed_game WHERE eventId = ? and proposerId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventId);
            preparedStatement.setObject(2, userId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public List<ProposedGameDto> getProposedGames(String eventId) {
        String sql = "SELECT * FROM proposed_game WHERE eventId = '" + eventId + "'";
        RowMapper<ProposedGameDto> mapper = getProposedGameRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    public SaveResult voteGames(List<Vote> votes) {
        String sql = "INSERT INTO vote VALUES(?, ?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE gameId = gameId";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            int i = 0;
            for (Vote vote : votes) {

                preparedStatement.setObject(1, vote.getEventId().toString());
                preparedStatement.setObject(2, vote.getGameId().toString());
                preparedStatement.setObject(3, vote.getOwnerId().toString());
                preparedStatement.setObject(4, vote.getVoterId().toString());

                preparedStatement.addBatch();

                i++;

                if (i % 1000 == 0 || i == votes.size()) {
                    preparedStatement.executeBatch();
                }
            }

            return preparedStatement;
        });

        return new SaveResult(true, null);
    }

    public List<Vote> getVotedGames(String eventId) {
        String sql = "SELECT * FROM vote WHERE eventId = '" + eventId + "'";
        RowMapper<Vote> mapper = getVoteRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    public SaveResult clearVotes(String eventId, String userId){
        String sql = "DELETE FROM vote WHERE eventId = ? and voterId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventId);
            preparedStatement.setObject(2, userId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult chooseGames(List<ProposedGameDto> games) {
        String sql = "UPDATE proposed_game SET isChosen = ? WHERE eventId = ? && gameId = ?";

        for (ProposedGameDto game : games) {
            jdbcTemplate.update(connection -> {
                PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                preparedStatement.setBoolean(1, game.isChosen());
                preparedStatement.setString(2, game.getEventId().toString());
                preparedStatement.setString(3, game.getGameId().toString());
                return preparedStatement;
            });
        }

        return new SaveResult(true, null);
    }

    public SaveResult clearChosenGames(String eventId) {
        String sql = "UPDATE proposed_game SET isChosen = ? WHERE eventId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setBoolean(1, false);
            preparedStatement.setString(2, eventId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    private RowMapper<GameDto> getGameRowMapper() {
        return (resultSet, i) -> new GameDto(
                UUID.fromString(resultSet.getString("id")),
                resultSet.getLong("bggId"),
                resultSet.getString("title"),
                resultSet.getString("type"),
                resultSet.getString("imageUrl"),
                resultSet.getString("description"),
                resultSet.getInt("minPlayers"),
                resultSet.getInt("maxPlayers"),
                resultSet.getInt("minPlayTime"),
                resultSet.getInt("maxPlayTime"),
                resultSet.getFloat("complexity"),
                resultSet.getInt("year")
        );
    }

    private RowMapper<CollectionItem> getCollectionItemRowMapper() {
        return (resultSet, i) -> new CollectionItem(
                UUID.fromString(resultSet.getString("userId")),
                resultSet.getLong("gameBggId")
        );
    }

    private RowMapper<ProposedGameDto> getProposedGameRowMapper() {
        return (resultSet, i) -> new ProposedGameDto(
                UUID.fromString(resultSet.getString("eventId")),
                UUID.fromString(resultSet.getString("gameId")),
                UUID.fromString(resultSet.getString("ownerId")),
                UUID.fromString(resultSet.getString("proposerId")),
                0L,
                "",
                "",
                "",
                "",
                0,
                resultSet.getBoolean("isChosen")
        );
    }

    private RowMapper<Vote> getVoteRowMapper() {
        return (resultSet, i) -> new Vote(
                UUID.fromString(resultSet.getString("eventId")),
                UUID.fromString(resultSet.getString("gameId")),
                UUID.fromString(resultSet.getString("ownerId")),
                UUID.fromString(resultSet.getString("voterId"))
        );
    }
}
