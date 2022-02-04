package com.bgmeetup.backend.domain;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class LeaderboardScore {
    private UUID id;
    private UUID eventId;
    private UUID gameId;
    private UUID participantId;
    private Integer score;
}