package com.ecinema.backend.input;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ShowTimeInput {
    
    @JsonProperty("movieId")
    private Long movieId;

    @JsonProperty("showRoomId")
    private Long showRoomId;

    @JsonProperty("durationMinutes")
    private Integer durationMinutes;

    @JsonProperty("durationHours")
    private Integer durationHours;

    @JsonProperty("startTime")
    private Time startTime;
}
