package com.ecinema.backend.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="payment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cardId")
    private Long cardId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="accountId", nullable=false)
    private User user;

    @Column(name="cardNumber")
    private String cardNumber;

    @Column(name="cardType")
    private String cardType;

    @Column(name="expirationDate")
    private Date expirationDate;

    @Column(name="billingAddressStreet")
    private String billingAddressStreet;

    @Column(name="billingAddressZip")
    private String billingAddressZip;
}
