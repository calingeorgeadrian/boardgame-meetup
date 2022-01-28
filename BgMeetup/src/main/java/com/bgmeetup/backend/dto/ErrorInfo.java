package com.bgmeetup.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class ErrorInfo {
    public String fieldName;
    public String errorName;
}
