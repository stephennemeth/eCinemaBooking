package com.ecinema.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration("bCryptPasswordEncoderConfiguration")
public class BCryptPasswordEncoderConfiguration {

    @Bean("bCryptPasswordEncoder")
    public BCryptPasswordEncoder getBCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
