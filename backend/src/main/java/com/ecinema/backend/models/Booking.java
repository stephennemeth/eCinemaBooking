package com.ecinema.backend.models;


import jakarta.persistence.*;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Formula;

@Data
@Entity
@Table(name = "booking")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="bookingNumber")
    private int bookingNumber;

    @Column(name ="ticketId")
    private Long ticketId ;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private User user;

    @OneToOne
    @JoinColumn(name = "showTimeId")
    private ShowTime showTime;

    @Column(name = "price")
    private Double price;

    @OneToOne
    @JoinColumn(name = "promoId")
    private Promotion promotion;

    @OneToOne
    @JoinColumn(name = "cardId")
    private Payment payment;

    @Transient
    private Long accountId;

    @Transient
    private Long showTimeId;

    @Transient
    private Long promoId;

    @Transient 
    private Long cardId;


    public void setUserId(Long accountId) {
        this.accountId = accountId;
    }


    public void setShowTimeId(Long showTimeId) {
        this.showTimeId = showTimeId;
    }

    public void setPromotionId(Long promoId) {
        this.promoId = promoId;
    }

    public void setPaymentId(Long cardId) {
        this.cardId = cardId;
    }


    @PostLoad
    @PostPersist
    @PostUpdate
    private void loadOnUpdate() {
        if (accountId != null) {
            this.user = new User();
            this.user.setAccountId(accountId);
        }
        if (showTimeId != null) {
            this.showTime = new ShowTime();
            this.showTime.setShowTimeId(showTimeId);
        }
        if (promoId != null) {
            this.promotion = new Promotion();
            this.promotion.setPromoId(promoId);
        }
        if (cardId != null) {
            this.payment = new Payment();
            this.payment.setCardId(cardId);
        }
    }
}
