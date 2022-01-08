package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.Event;
import com.bgmeetup.backend.dto.EventDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
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
public class EventRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<EventDto> get(UUID id) {
        String sql = "SELECT * FROM events WHERE id = ?";
        RowMapper<EventDto> mapper = getEventRowMapper();
        return jdbcTemplate.query(sql, mapper, id.toString()).stream().findFirst();
    }

    public List<EventDto> getAll() {
        String sql = "SELECT * FROM events";
        RowMapper<EventDto> mapper = getEventRowMapper();
        return jdbcTemplate.query(sql, mapper);
    }

    public void save(Event event) {
        String sql = "INSERT INTO events VALUES(?, ?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, null);
            preparedStatement.setString(2, event.getHostId().toString());
            preparedStatement.setString(3, event.getTitle());
            preparedStatement.setString(4, event.getLocation());
            preparedStatement.setInt(5, event.getRequiredNumberOfPlayers());
            preparedStatement.setTimestamp(6, Timestamp.valueOf(event.getDate()));
            return preparedStatement;
        }, keyHolder);

        //return keyHolder.;
    }

    private RowMapper<EventDto> getEventRowMapper() {
        return (resultSet, i) -> new EventDto(
                UUID.fromString(resultSet.getString("id")),
                UUID.fromString(resultSet.getString("hostId")),
                resultSet.getString("title"),
                resultSet.getString("location"),
                resultSet.getInt("requiredNumberOfPlayers"),
                resultSet.getObject("datePlaced", LocalDateTime.class)
        );
    }
}
