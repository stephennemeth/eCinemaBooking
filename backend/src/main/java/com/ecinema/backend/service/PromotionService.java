package com.ecinema.backend.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.input.PromotionInput;
import com.ecinema.backend.models.Promotion;
import com.ecinema.backend.repository.PromotionRepository;


@Service("promotionService")
public class PromotionService {
    
    @Autowired
    @Qualifier("promotionRepository")
    private PromotionRepository promotionRepository;

    public Promotion createPromotion(PromotionInput input) {
        Promotion promotion = new Promotion();

        promotion.setPromoCode(input.getPromoCode());
        promotion.setDiscount(input.getDiscount());
        promotion.setStartDate(input.getStartDate());
        promotion.setEndDate(input.getEndDate());

        return this.promotionRepository.save(promotion);
    }

    public List<Promotion> getAllPromotions() {
        return this.promotionRepository.findAll();
    }
    
    public void deletePromotionByPromoCodeAndDiscount(String promoCode, Long discount) {
        Promotion promotion = this.promotionRepository.findByPromoCodeAndDiscount(promoCode, discount);
        
        if (promotion != null) {
            this.promotionRepository.delete(promotion);
        }
    }

}
