package com.ecinema.backend.models;

import jakarta.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonManagedReference;

 
@Data
@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="accountId")
    private Long accountId;

    // @Column(name ="promotionStatus")
    // private int promotionStatus;

    @Column(name ="firstName")
    private String firstName;

    @Column(name ="lastName")
    private String lastName;

    @Column(name ="phoneNumber")
    private String phoneNumber;

    @Column(name ="email")
    private String email; 

    @Column(name ="password")
    private String password;
    
    @Column(name="userTypeId")
    private Integer userTypeId;

    @Column(name="userStatusId")
    private Integer userStatusId;

    @OneToOne
    @JoinColumn(name="addressId")
    private Address address;
    // @OneToOne(mappedBy="addressId") use in address

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> cards = new ArrayList<>(); 
}
