package com.ecinema.backend.models;

import com.ecinema.backend.enums.Status;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "seatstatus")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SeatStatus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seatStatusId")
    @JsonProperty("seatStatusId")
    private Long seatStatusId;

    @Column(name = "status")
    @JsonProperty("status")
    private Status status;
}