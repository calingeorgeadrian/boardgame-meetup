package com.bgmeetup.backend.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class FriendInvitationDto {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String location;
    private String bggUsername;
}
