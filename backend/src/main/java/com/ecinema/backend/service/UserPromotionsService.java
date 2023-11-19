package com.ecinema.backend.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.input.UserPromotionsInput;
import com.ecinema.backend.models.User;
import com.ecinema.backend.models.Promotion;
import com.ecinema.backend.models.UserPromotions;
import com.ecinema.backend.models.UserPromotions.UserPromotionsId;
import com.ecinema.backend.repository.PromotionRepository;
import com.ecinema.backend.repository.UserPromotionsRepository;
import com.ecinema.backend.repository.UserRepository;

@Service("userPromotionsService")
public class UserPromotionsService {

    @Autowired
    @Qualifier("userPromotionsRepository")
    private UserPromotionsRepository userPromotionsRepository;

    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;
    
    @Autowired
    @Qualifier("promotionRepository")
    private PromotionRepository promotionRepository;

    public UserPromotions updateUserPromotionStatus(UserPromotionsInput input) {
        User user = userRepository.findByAccountId(input.getAccountId());

        if (user == null) {
            throw new IllegalArgumentException("User not found with accountId: " + input.getAccountId());
        }

        if (user.getPromotionStatusId() == null || user.getPromotionStatusId() == 2) {
            throw new IllegalArgumentException("User is not subscribed for promotions");
        }

        Promotion promotion = promotionRepository.findByPromoId(input.getPromoId());
        
        if (promotion == null) {
            throw new IllegalArgumentException("Promotion not found with promoId: " + input.getPromoId());
        }
        
        if (!isValidPromoDateRange(promotion)) {
            throw new IllegalArgumentException("Promo is not within the valid date range");
        }

        UserPromotionsId userPromotionsId = new UserPromotionsId(user, promotion);

        if (userPromotionsRepository.existsById(userPromotionsId)) {
            throw new IllegalArgumentException("User has already used the promotion");
        }

        UserPromotions userPromotions = new UserPromotions();
        userPromotions.setId(userPromotionsId);
        userPromotions.setPromoUsed(true);

        return userPromotionsRepository.save(userPromotions);
    }
    
    private boolean isValidPromoDateRange(Promotion promotion) {
        long currentDate = System.currentTimeMillis();
        long startDate = promotion.getStartDate().getTime();
        long endDate = promotion.getEndDate().getTime() + (24 * 60 * 60 * 1000);

        return currentDate >= startDate && currentDate <= endDate;
    }


}
