package com.bgmeetup.backend.domain;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class Game {
    private UUID id;
    private String title;
    private String description;
    private Integer minPlayers;
    private Integer maxPlayers;
    private Integer playingTime;
}
