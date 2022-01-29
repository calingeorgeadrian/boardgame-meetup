package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.Event;
import com.bgmeetup.backend.domain.EventParticipant;
import com.bgmeetup.backend.dto.EventDto;
import com.bgmeetup.backend.dto.EventParticipantDto;
import com.bgmeetup.backend.dto.SaveResult;
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

    public SaveResult create(Event event) {
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

        var participant = new EventParticipant(eventId, event.getHostId(), event.getHostId(), InviteStatus.Accepted.getValue());
        this.invite(participant);

        return new SaveResult(true,null);
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
        String sql = "INSERT INTO event_participant VALUES(?, ?, ?, ?)";

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

    public void invite(EventParticipant eventParticipant){
        String sql = "INSERT INTO event_participant VALUES(?, ?, ?, ?)";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, eventParticipant.getEventId().toString());
            preparedStatement.setObject(2, eventParticipant.getParticipantId().toString());
            preparedStatement.setObject(3, eventParticipant.getInviterId().toString());
            preparedStatement.setObject(4, eventParticipant.getStatus());
            return preparedStatement;
        });
    }

    public List<EventParticipantDto> getParticipants(String eventId){
        String sql = "SELECT * FROM event_participant WHERE eventId = ?";
        RowMapper<EventParticipantDto> mapper = getEventParticipantRowMapper();
        return jdbcTemplate.query(sql, mapper, eventId);
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
                0,
                0
        );
    }

    private RowMapper<EventParticipantDto> getEventParticipantRowMapper() {
        return (resultSet, i) -> new EventParticipantDto(
                UUID.fromString(resultSet.getString("eventId")),
                UUID.fromString(resultSet.getString("participantId")),
                UUID.fromString(resultSet.getString("inviterId")),
                resultSet.getInt("status"),
                "",
                ""
        );
    }
}
