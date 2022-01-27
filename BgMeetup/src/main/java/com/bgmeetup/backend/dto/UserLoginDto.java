package com.bgmeetup.backend.dto;

import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class UserLoginDto {
    @Size(min=1, max=256)
    private String email;
    private String firstName;
    private String lastName;
    @Size(min=1, max=128)
    private String password;
    private String confirmPassword;
}