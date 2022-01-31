package com.bgmeetup.backend.dto;


import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class ProposedGameDto {
    public UUID eventId;
    public UUID gameId;
    public UUID ownerId;
    public UUID proposerId;
    private Long bggId;
    public String title;
    public String imageUrl;
    public String proposerName;
    public Integer votes;
}