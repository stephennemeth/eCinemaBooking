package com.ecinema.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.ecinema.backend.models.VerificationCode;

@Repository("verificationCodeRepository")
public interface VerificationCodeRepository extends JpaRepository<VerificationCode,Long> {
    public VerificationCode findByAccountId(Long accountId);
    public VerificationCode findByAccountIdAndCodeAndCodeType(Long accountId, String code, Integer codeType);
}