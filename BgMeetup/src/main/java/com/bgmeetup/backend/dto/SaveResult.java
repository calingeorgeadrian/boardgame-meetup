package com.bgmeetup.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class SaveResult {
    public boolean result;
    public List<ErrorInfo> errors;
}
