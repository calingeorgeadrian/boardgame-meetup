package com.bgmeetup.backend.domain;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class Vote {
    public UUID eventId;
    public UUID gameId;
    public UUID ownerId;
    public UUID voterId;
}
