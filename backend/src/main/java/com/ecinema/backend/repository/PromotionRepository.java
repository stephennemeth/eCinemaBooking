package com.ecinema.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Promotion;

@Repository("promotionRepository")
public interface PromotionRepository extends JpaRepository<Promotion, Long>{
}
