package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.User;
import com.bgmeetup.backend.dto.UserDto;
import com.bgmeetup.backend.dto.UserLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void register(User user) {
        String sql = "INSERT INTO user VALUES(?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, UUID.randomUUID().toString());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getFirstName());
            preparedStatement.setString(4, user.getLastName());
            preparedStatement.setString(5, user.getLocation());
            preparedStatement.setObject(6, user.getPasswordHash());
            preparedStatement.setObject(7, user.getPasswordSalt());
            return preparedStatement;
        });
    }

    public Optional<UserDto> login(UserLoginDto userLogin) {
        String sql = "SELECT * FROM user WHERE email = ?";
        RowMapper<UserDto> mapper = getUserRowMapper();
        return jdbcTemplate.query(sql, mapper, userLogin.getEmail()).stream().findFirst();
    }

    public Optional<UserDto> get(String id) {
        String sql = "SELECT * FROM user WHERE id = ?";
        RowMapper<UserDto> mapper = getUserRowMapper();
        return jdbcTemplate.query(sql, mapper, id).stream().findFirst();
    }


    public User update(User user) {
        String sql = "UPDATE user SET email = ?, firstName = ?, lastName = ?, location = ? WHERE id = ?";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getEmail());
            preparedStatement.setString(2, user.getFirstName());
            preparedStatement.setString(3, user.getLastName());
            preparedStatement.setString(4, user.getLocation());
            preparedStatement.setObject(5, user.getId().toString());
            return preparedStatement;
        });
        return user;
    }

    private RowMapper<UserDto> getUserRowMapper() {
        return (resultSet, i) -> new UserDto(
                UUID.fromString(resultSet.getString("id")),
                resultSet.getString("email"),
                resultSet.getString("firstName"),
                resultSet.getString("lastName"),
                resultSet.getString("location"),
                resultSet.getBytes("passwordSalt"),
                resultSet.getBytes("passwordHash")
        );
    }
}