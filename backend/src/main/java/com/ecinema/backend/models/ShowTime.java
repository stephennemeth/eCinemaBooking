package com.ecinema.backend.models;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.sql.Time;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="showtime")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ShowTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showTimeId")
    private Long showTimeId;
    
    @Column(name = "movieId")
    private Long movieId;

    @Column(name = "showRoomId")
    private Long showRoomId;

    @Column(name = "showDateTime")
    private LocalDateTime dateTime;

    @Column(name = "startTime")
    @Temporal(TemporalType.TIME)
    private Time startTime;

    @Column(name = "endTime")
    @Temporal(TemporalType.TIME)
    private Time endTime;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "showTimeId")
    List<Seat> seats;
}