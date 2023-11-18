package com.ecinema.backend.models;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Table(name = "userpromotions")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserPromotions {

    @Embeddable
    public static class UserPromotionsId implements Serializable {
        @ManyToOne
        @JoinColumn(name = "accountId")
        private User user;

        @ManyToOne
        @JoinColumn(name = "promoId")
        private Promotion promotion;

        public UserPromotionsId() {
        }

        public UserPromotionsId(User user, Promotion promotion) {
            this.user = user;
            this.promotion = promotion;
        }

        public Long getAccountId() {
            return user != null ? user.getAccountId() : null;
        }

        public Long getPromoId() {
            return promotion != null ? promotion.getPromoId() : null;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            UserPromotionsId that = (UserPromotionsId) o;
            return Objects.equals(user, that.user) && Objects.equals(promotion, that.promotion);
        }

        @Override
        public int hashCode() {
            return Objects.hash(user, promotion);
        }
    }

    @EmbeddedId
    private UserPromotionsId id;

    @Column(name = "promoUsed")
    private Boolean promoUsed;
}
