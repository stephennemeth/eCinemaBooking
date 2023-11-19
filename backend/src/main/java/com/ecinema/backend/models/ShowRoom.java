package com.ecinema.backend.models;


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
@Table(name = "showroom")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ShowRoom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showRoomId")
    private Long showRoomId;

    @Column(name = "numberOfSeats")
    private Integer numberOfSeats;
}