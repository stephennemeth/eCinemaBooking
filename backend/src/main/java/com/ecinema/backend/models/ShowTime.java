package com.ecinema.backend.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Table(name = "showTime", uniqueConstraints = @UniqueConstraint(columnNames = {"screenId", "movieId", "date"}))
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ShowTime {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showTimeId")
    private Long showTimeId;
    
    @ManyToOne
    @JoinColumn(name = "screenId")
    private Theater theater;

    @ManyToOne
    @JoinColumn(name = "movieId")
    private Movie movie;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
}
