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
    private UUID senderId;
    private UUID receiverId;
    private String email;
    private String name;
}
