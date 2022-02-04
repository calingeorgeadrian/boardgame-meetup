package com.bgmeetup.backend.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class EventParticipantDto {
    private UUID eventId;
    private UUID participantId;
    private UUID inviterId;
    private String participantName;
    private String email;
    private String bggUsername;
    private Integer status;
    private boolean checkedIn;
}