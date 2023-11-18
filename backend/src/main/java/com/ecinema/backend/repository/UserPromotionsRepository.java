package com.ecinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.UserPromotions;
import com.ecinema.backend.models.UserPromotions.UserPromotionsId;

@Repository("userPromotionsRepository")
public interface UserPromotionsRepository extends JpaRepository<UserPromotions, UserPromotionsId> {

}
