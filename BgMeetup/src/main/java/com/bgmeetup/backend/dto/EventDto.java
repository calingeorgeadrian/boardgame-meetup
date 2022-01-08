package com.bgmeetup.backend.dto;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class EventDto {
    private UUID id;
    @NotNull
    private UUID hostId;
    @Size(min=1, max=128)
    private String title;
    @Size(min=1, max=128)
    private String location;
    @Min(value = 2, message = "Minimum number of players should not be less than 2")
    private Integer requiredNumberOfPlayers;
    @NotNull
    private LocalDateTime date;
}
