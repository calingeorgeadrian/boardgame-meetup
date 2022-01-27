package com.bgmeetup.backend.domain;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class EventParticipant {
    private UUID eventId;
    private UUID participantId;
    private UUID inviterId;
}
