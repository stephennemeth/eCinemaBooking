package com.ecinema.backend.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showRoomId")
    private ShowRoom showRoom;

    @Column(name = "showDateTime")
    @Temporal(TemporalType.DATE)
    private Date dateTime;

    @Column(name = "duration")
    private Integer duration;
}