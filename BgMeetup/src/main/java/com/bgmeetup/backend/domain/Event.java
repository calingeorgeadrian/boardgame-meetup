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
public class Event {
    private UUID id;
    private UUID hostId;
    private String title;
    private String location;
    private Integer requiredNumberOfPlayers;
    private LocalDateTime date;
}
