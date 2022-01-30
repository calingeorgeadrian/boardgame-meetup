package com.bgmeetup.backend.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class GameDto {
    private UUID id;
    private Long bggId;
    private String title;
    private String type;
    private String imageUrl;
    private String description;
    private Integer minPlayers;
    private Integer maxPlayers;
    private Integer minPlayTime;
    private Integer maxPlayTime;
    private Float complexity;
    private Integer year;
}
