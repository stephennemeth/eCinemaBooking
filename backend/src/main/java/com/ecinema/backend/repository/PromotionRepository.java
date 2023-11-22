package com.ecinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Promotion;

@Repository("promotionRepository")
public interface PromotionRepository extends JpaRepository<Promotion, Long>{
	public Promotion findByPromoId(Long promoId);
	
	public Promotion findByPromoCode(String promoCode);
}
