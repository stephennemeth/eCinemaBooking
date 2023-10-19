package com.ecinema.backend.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@Entity
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="addressId")
    private Long addressId;

    @Column(name ="streetName")
    private String streetName;

    @Column(name ="city")
    private String city;

    @Column(name ="state")
    private String state;

    @Column(name ="zipcode")
    private int zipcode;
}
