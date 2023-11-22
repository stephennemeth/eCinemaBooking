package com.ecinema.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecinema.backend.exception.EmptyResponseException;
import com.ecinema.backend.input.PromotionInput;
import com.ecinema.backend.models.Promotion;
import com.ecinema.backend.service.PromotionService;


@RestController
@RequestMapping("/api/v1/promotion")
@CrossOrigin("http://localhost:3000")

public class PromotionController {
    @Autowired
    @Qualifier("promotionService")
    private PromotionService promotionService;

    @GetMapping("/getAllPromotions")
    public ResponseEntity<List<Promotion>> getAllPromotions() throws EmptyResponseException {
        List<Promotion> promotions = this.promotionService.getAllPromotions();

        if (promotions.isEmpty()) {
            throw new EmptyResponseException("There are no promotions available");
        }

        return ResponseEntity.status(HttpStatus.OK).body(promotions);
    }
    
    @PostMapping("/addPromotion")
    public ResponseEntity<Object> createPromotion(@RequestBody PromotionInput input) {
        try {
            Promotion createdPromotion = promotionService.createPromotion(input);
            return new ResponseEntity<>(createdPromotion, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/sendPromotion/{promoId}")
    public ResponseEntity<Promotion> sendPromotion(@PathVariable Long promoId) throws EmptyResponseException {
        Promotion promotion = this.promotionService.sendPromotion(promoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(promotion);
    }
    
    @PutMapping("/updatePromotion/{promoId}")
    public ResponseEntity<?> updatePromotion(@PathVariable Long promoId, @RequestBody PromotionInput input) {
        try {
            Promotion updatedPromotion = this.promotionService.updatePromotion(promoId, input);
            return ResponseEntity.status(HttpStatus.OK).body(updatedPromotion);
        } catch (EmptyResponseException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/getPromotionByPromoCode/{promoCode}")
    public ResponseEntity<?> getPromotionByPromoCode(@PathVariable String promoCode) throws EmptyResponseException {
        try {
            Map<String, Object> promotionDetails = this.promotionService.getPromotionByPromoCode(promoCode);
            return ResponseEntity.status(HttpStatus.OK).body(promotionDetails);
        } catch (EmptyResponseException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}

