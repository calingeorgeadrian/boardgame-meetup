package com.bgmeetup.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class EventDto implements Serializable {
    private UUID id;
    @NotNull
    private UUID hostId;
    private String hostName;
    @Size(min=1, max=128)
    private String title;
    @Size(min=1, max=128)
    private String location;
    @Min(value = 2, message = "Minimum number of players should not be less than 2")
    private Integer reqNumberOfPlayers;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssz")
    private LocalDateTime date;
    private String dateString;
    private String invitedBy;
    private Integer status;
    private Integer participantsCount;
}
