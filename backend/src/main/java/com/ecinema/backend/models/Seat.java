package com.ecinema.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "logicalseat")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seatId")
    private Long seatId;

    @JoinColumn(name = "seatStatusId")
    private Long seatStatusId;

    @Column(name = "showTimeId")
    private Long showTimeId;

    @Column(name = "showRoomId")
    private Long showRoomId;
}