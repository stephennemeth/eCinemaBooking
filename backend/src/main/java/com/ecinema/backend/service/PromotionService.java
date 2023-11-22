package com.ecinema.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.exception.EmptyResponseException;
import com.ecinema.backend.input.PromotionInput;
import com.ecinema.backend.models.Promotion;
import com.ecinema.backend.models.User;
import com.ecinema.backend.repository.PromotionRepository;


@Service("promotionService")
public class PromotionService {
    
    @Autowired
    @Qualifier("promotionRepository")
    private PromotionRepository promotionRepository;
    
    @Autowired
    @Qualifier("userService")
    private UserService userService;
    
    @Autowired
    @Qualifier("emailService")
    private EmailService emailService;

    public Promotion createPromotion(PromotionInput input) {
        Promotion promotion = new Promotion();

        promotion.setPromoCode(input.getPromoCode());
        promotion.setDiscount(input.getDiscount());
        promotion.setStartDate(input.getStartDate());
        promotion.setEndDate(input.getEndDate());
        promotion.setPromoSent(false); 
        
        Promotion savedPromotion = this.promotionRepository.save(promotion);
        //sendPromotionToUsers(savedPromotion);
        return savedPromotion;
    }
    
    public Promotion sendPromotion(Long promoId) throws EmptyResponseException {
    	Optional<Promotion> optionalPromotion = promotionRepository.findById(promoId);
    	if (optionalPromotion.isPresent()) {
            Promotion promotion = optionalPromotion.get();
            sendPromotionToUsers(promotion);
            return promotion;
        } else {
            throw new EmptyResponseException("Promotion with ID " + promoId + " not found.");
        }
    }
    
    public List<Promotion> getAllPromotions() {
        return this.promotionRepository.findAll();
    }
    
    private void sendPromotionToUsers(Promotion promotion) {
        List<User> usersWithPromotionStatusOne = userService.getUsersByPromotionStatus(1L);
        boolean atLeastOneEmailSent = false;

        for (User user : usersWithPromotionStatusOne) {
            if (!promotion.getPromoSent()) {
                boolean emailSent = sendEmailToUser(user, promotion);
                //System.out.print(emailSent);
                if (emailSent) {
                    atLeastOneEmailSent = true;
                }
            }
        }

        if (atLeastOneEmailSent) {
            promotion.setPromoSent(true);
            promotionRepository.save(promotion);
        } 
    }
    
    private boolean sendEmailToUser(User user, Promotion promotion) {
    	this.emailService.sendPromotionEmail(user.getEmail(), promotion);
        return true; 
    }
    
    public Promotion updatePromotion(Long promoId, PromotionInput input) throws EmptyResponseException {
        Optional<Promotion> optionalPromotion = promotionRepository.findById(promoId);

        if (optionalPromotion.isPresent()) {
            Promotion existingPromotion = optionalPromotion.get();
            if (!existingPromotion.getPromoSent()) {
                if (input.getPromoCode() != null) {
                    existingPromotion.setPromoCode(input.getPromoCode());
                }
                if (input.getDiscount() != null) {
                    existingPromotion.setDiscount(input.getDiscount());
                }
                if (input.getEndDate() != null) {
                    existingPromotion.setEndDate(input.getEndDate());
                }
                if (input.getStartDate() != null) {
                    existingPromotion.setStartDate(input.getStartDate());
                }

                Promotion updatedPromotion = promotionRepository.save(existingPromotion);
                //sendPromotionToUsers(updatedPromotion);
                return updatedPromotion;
            } else {
                throw new IllegalArgumentException("Cannot update a promotion which is sent to users.");
            }
        } else {
            throw new EmptyResponseException("Promotion with ID " + promoId + " not found.");
        }
    }

    public Map<String, Object> getPromotionByPromoCode(String promoCode) throws EmptyResponseException {
        Promotion promotion = promotionRepository.findByPromoCode(promoCode);

        if (promotion != null) {
            Map<String, Object> promotionDetails = new HashMap<>();
            promotionDetails.put("promoId", promotion.getPromoId());
            promotionDetails.put("discount", promotion.getDiscount());

            return promotionDetails;
        } else {
            throw new EmptyResponseException("Promo code not found");
        }
    }
    
    /*public void deletePromotionByPromoCodeAndDiscount(String promoCode, Long discount) {
        Promotion promotion = this.promotionRepository.findByPromoCodeAndDiscount(promoCode, discount);
        
        if (promotion != null) {
            this.promotionRepository.delete(promotion);
        }
    }*/

}
