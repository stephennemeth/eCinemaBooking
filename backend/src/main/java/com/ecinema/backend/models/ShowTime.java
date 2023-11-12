package com.ecinema.backend.models;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

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
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showRoomId")
    private ShowRoom showRoom;

    @Column(name = "showDateTime")
    private LocalDateTime dateTime;

    @Column(name = "duration")
    private Integer duration;
}