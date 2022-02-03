package com.bgmeetup.backend.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class LeaderboardScoreDto {
    private UUID eventId;
    private UUID gameId;
    private UUID participantId;
    private String title;
    private String participantName;
    private Integer score;
}
