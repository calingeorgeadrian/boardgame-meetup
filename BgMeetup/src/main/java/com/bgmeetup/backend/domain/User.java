package com.bgmeetup.backend.domain;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class User {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String location;
    private String bggUsername;
    private byte[] passwordSalt;
    private byte[] passwordHash;
}
