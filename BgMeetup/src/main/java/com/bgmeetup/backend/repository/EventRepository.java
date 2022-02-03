package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.*;
import com.bgmeetup.backend.dto.*;
import com.bgmeetup.backend.enums.EventStatus;
import com.bgmeetup.backend.enums.InviteStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.*;

@Repository
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<EventDto> get(String eventId) {
        String sql = "SELECT * FROM event WHERE id = ?";
        RowMapper<EventDto> mapper = getEventRowMapper();
        return jdbcTemplate.query(sql, mapper, eventId).stream().findFirst();
    }

    public List<EventDto> getAll() {
        String sql = "SELECT * FROM event";
        RowMapper<EventDto> mapper = getEventRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    public UUID create(Event event) {
        String sql = "INSERT INTO event VALUES(?, ?, ?, ?, STR_TO_DATE(? ,'%Y-%m-%d %H:%i:%s'), ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        var eventId = UUID.randomUUID();

        String dateString = event.getDate().toString();
        var dateParts  = dateString.split("T");
        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventId.toString());
            preparedStatement.setString(2, event.getHostId().toString());
            preparedStatement.setString(3, event.getTitle());
            preparedStatement.setString(4, event.getLocation());
            preparedStatement.setString(5, dateParts[0] + " " + dateParts[1] + ":00");
            preparedStatement.setInt(6, event.getReqNumberOfPlayers());
            preparedStatement.setInt(7, EventStatus.Pending.getValue());
            return preparedStatement;
        }, keyHolder);

        return eventId;
    }


    public SaveResult update(Event event) {
        String sql = "UPDATE event SET location = ? WHERE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, event.getLocation());
            preparedStatement.setObject(2, event.getId().toString());
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult join(String eventId, String userId){
        String sql = "INSERT INTO event_participant VALUES(?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventId);
            preparedStatement.setObject(2, userId);
            preparedStatement.setObject(3, userId);
            preparedStatement.setObject(4, InviteStatus.Accepted.getValue());
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult leave(String eventId, String userId){
        String sql = "DELETE FROM event_participant WHERE eventId = ? and participantId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventId);
            preparedStatement.setObject(2, userId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult cancel(String eventId){
        String sql = "UPDATE event SET status = ? WHERE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, EventStatus.Canceled.getValue());
            preparedStatement.setObject(2, eventId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult confirm(String eventId){
        String sql = "UPDATE event SET status = ? WHERE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, EventStatus.Confirmed.getValue());
            preparedStatement.setObject(2, eventId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult invite(EventParticipant eventParticipant){
        String sql = "INSERT INTO event_participant VALUES(?, ?, ?, ?, ?, ?)" +
                     "ON DUPLICATE KEY UPDATE status = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventParticipant.getEventId().toString());
            preparedStatement.setObject(2, eventParticipant.getParticipantId().toString());
            preparedStatement.setObject(3, eventParticipant.getInviterId().toString());
            preparedStatement.setString(4, eventParticipant.getEmail());
            preparedStatement.setInt(5, eventParticipant.getStatus());
            preparedStatement.setBoolean(6, eventParticipant.isCheckedIn());
            preparedStatement.setInt(7, eventParticipant.getStatus());
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult acceptInvitation(String eventId, String userId) {
        String sql = "UPDATE event_participant SET status = ? WHERE eventId = ? && participantId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, InviteStatus.Accepted.getValue());
            preparedStatement.setString(2, eventId);
            preparedStatement.setString(3, userId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult declineInvitation(String eventId, String userId) {
        String sql = "UPDATE event_participant SET status = ? WHERE eventId = ? && participantId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, InviteStatus.Refused.getValue());
            preparedStatement.setString(2, eventId);
            preparedStatement.setString(3, userId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public Optional<EventParticipantDto> getParticipant(String eventId, String email) {
        String sql = "SELECT * FROM event_participant WHERE eventId = '" + eventId +
                     "' &&  email = '" + email + "'";
        RowMapper<EventParticipantDto> mapper = getEventParticipantRowMapper();
        return jdbcTemplate.query(sql, mapper).stream().findFirst();
    }

    public List<EventParticipantDto> getParticipants(String eventId){
        String sql = "SELECT * FROM event_participant WHERE eventId = ?";
        RowMapper<EventParticipantDto> mapper = getEventParticipantRowMapper();
        return jdbcTemplate.query(sql, mapper, eventId);
    }

    public SaveResult checkIn(String eventId, String userId) {
        String sql = "UPDATE event_participant SET checkedIn = ? WHERE eventId = ? && participantId = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setBoolean(1, true);
            preparedStatement.setString(2, eventId);
            preparedStatement.setString(3, userId);
            return preparedStatement;
        });
        return new SaveResult(true, null);
    }

    public SaveResult submitLeaderboard(List<LeaderboardScore> scores) {
        String sql = "INSERT INTO score VALUES(?, ?, ?, ?, ?)" +
                     "ON DUPLICATE KEY UPDATE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            int i = 0;
            for (LeaderboardScore score : scores) {

                var scoreId = UUID.randomUUID().toString();
                preparedStatement.setObject(1, scoreId);
                preparedStatement.setObject(2, score.getEventId().toString());
                preparedStatement.setObject(3, score.getGameId().toString());
                preparedStatement.setObject(4, score.getParticipantId().toString());
                preparedStatement.setObject(5, score.getScore());
                preparedStatement.setObject(6, scoreId);

                preparedStatement.addBatch();

                i++;

                if (i % 1000 == 0 || i == scores.size()) {
                    preparedStatement.executeBatch();
                }
            }

            return preparedStatement;
        });

        return new SaveResult(true, null);
    }

    public List<LeaderboardScoreDto> getLeaderboard(String eventId) {
        String sql = "SELECT * FROM score WHERE eventId = '" + eventId + "'";
        RowMapper<LeaderboardScoreDto> mapper = getLeaderboardScoreRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    public SaveResult submitFeedback(List<Feedback> feedbacks) {
        String sql = "INSERT INTO feedback VALUES(?, ?, ?, ?, ?, ?)" +
                     "ON DUPLICATE KEY UPDATE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            int i = 0;
            for (Feedback feedback : feedbacks) {
                var feedbackId = UUID.randomUUID().toString();
                preparedStatement.setObject(1, feedbackId);
                preparedStatement.setObject(2, feedback.getEventId().toString());
                preparedStatement.setObject(3, feedback.getGameId().toString());
                preparedStatement.setObject(4, feedback.getParticipantId().toString());
                preparedStatement.setObject(5, feedback.getFeedbackGiverId().toString());
                preparedStatement.setObject(6, feedback.getType());
                preparedStatement.setObject(7, feedbackId);

                preparedStatement.addBatch();

                i++;

                if (i % 1000 == 0 || i == feedbacks.size()) {
                    preparedStatement.executeBatch();
                }
            }

            return preparedStatement;
        });

        return new SaveResult(true, null);
    }

    public List<Feedback> getFeedback(String eventId) {
        String sql = "SELECT * FROM feedback WHERE eventId = '" + eventId + "'";
        RowMapper<Feedback> mapper = getFeedbackRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    private RowMapper<EventDto> getEventRowMapper() {
        return (resultSet, i) -> new EventDto(
                UUID.fromString(resultSet.getString("id")),
                UUID.fromString(resultSet.getString("hostId")),
                "",
                resultSet.getString("title"),
                resultSet.getString("location"),
                resultSet.getInt("reqNumberOfPlayers"),
                resultSet.getObject("date", LocalDateTime.class),
                "",
                "",
                resultSet.getInt("status"),
                0
        );
    }

    private RowMapper<EventParticipantDto> getEventParticipantRowMapper() {
        return (resultSet, i) -> new EventParticipantDto(
                UUID.fromString(resultSet.getString("eventId")),
                UUID.fromString(resultSet.getString("participantId")),
                UUID.fromString(resultSet.getString("inviterId")),
                "",
                resultSet.getString("email"),
                "",
                resultSet.getInt("status"),
                resultSet.getBoolean("checkedIn")
        );
    }

    private RowMapper<LeaderboardScoreDto> getLeaderboardScoreRowMapper() {
        return (resultSet, i) -> new LeaderboardScoreDto(
                UUID.fromString(resultSet.getString("eventId")),
                UUID.fromString(resultSet.getString("gameId")),
                UUID.fromString(resultSet.getString("participantId")),
                "",
                "",
                resultSet.getInt("score")
        );
    }

    private RowMapper<Feedback> getFeedbackRowMapper() {
        return (resultSet, i) -> new Feedback(
                UUID.fromString(resultSet.getString("id")),
                UUID.fromString(resultSet.getString("eventId")),
                UUID.fromString(resultSet.getString("gameId")),
                UUID.fromString(resultSet.getString("participantId")),
                UUID.fromString(resultSet.getString("feedbackGiverId")),
                resultSet.getInt("type")
        );
    }
}
