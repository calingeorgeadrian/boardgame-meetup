package com.bgmeetup.backend.repository;

import com.bgmeetup.backend.domain.Friend;
import com.bgmeetup.backend.dto.FriendDto;
import com.bgmeetup.backend.dto.SaveResult;
import com.bgmeetup.backend.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class FriendRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public SaveResult addFriend(UUID userId, Friend friend) {
        String sql = "INSERT INTO friends VALUES(?, ?, ?)";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, UUID.randomUUID().toString());
            preparedStatement.setObject(2, userId);
            preparedStatement.setObject(3, friend.getFriendId());
            return preparedStatement;
        });

        return new SaveResult(true, null);
    }

    public List<FriendDto> getFriends(String userId) {
        String sql = "SELECT * FROM friends WHERE userId = ?";
        RowMapper<FriendDto> mapper = getFriendRowMapper();
        return new ArrayList<>(jdbcTemplate.query(sql, mapper, userId));
    }

    private RowMapper<FriendDto> getFriendRowMapper() {
        return (resultSet, i) -> new FriendDto(
                UUID.fromString(resultSet.getString("friendId")),
                resultSet.getString("name")
        );
    }

    public SaveResult sendFriendRequest(String senderId, String receiverId) {
        String sql = "INSERT INTO pending_friend_request VALUES(?, ?)";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setObject(1, senderId);
            preparedStatement.setObject(2, receiverId);
            return preparedStatement;
        });

        return new SaveResult(true, null);
    }

    public List<String> getSenderIdsForReceivedFriendRequests(String userId) {
        String sql = "SELECT * FROM pending_friend_request WHERE receiverId = ?";

        RowMapper<String> mapper = ((resultSet, i) -> resultSet.getString("senderId"));
        return new ArrayList<>(jdbcTemplate.query(sql, mapper, userId));
    }

    public List<String> getReceiverIdsForSentFriendRequests(String userId) {
        String sql = "SELECT * FROM pending_friend_request WHERE senderId = ?";

        RowMapper<String> mapper = ((resultSet, i) -> resultSet.getString("receiverId"));
        return new ArrayList<>(jdbcTemplate.query(sql, mapper, userId));
    }

    public void declineFriendRequest(String userId, String friendId) {
        String sql = "DELETE FROM pending_friend_request WHERE (senderId = ? AND receiverId = ?) OR (receiverId = ? AND senderId = ?)";
        jdbcTemplate.update(sql, userId, friendId, friendId, userId);
    }

    public void acceptFriendRequest(String userId, String friendId, String nameUser, String nameFriend) {
        String sql1 = "INSERT INTO friends VALUES(?, ?, ?, ?)";
        jdbcTemplate.update(sql1, UUID.randomUUID().toString(), userId, friendId, nameFriend);
        String sql2 = "INSERT INTO friends VALUES(?, ?, ?, ?)";
        jdbcTemplate.update(sql2, UUID.randomUUID().toString(), friendId, userId, nameUser);
    }

    public void removeFriend(String userId, String friendId) {
        String sql = "DELETE FROM friends WHERE (userId = ? AND friendId = ?) OR (userId = ? AND friendId = ?)";
        jdbcTemplate.update(sql, userId, friendId, friendId, userId);
    }
}
