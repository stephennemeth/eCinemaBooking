package com.ecinema.backend.configurations;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailSenderConfigurations {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.mail.yahoo.com");
        mailSender.setPort(587); // Set the appropriate port
        mailSender.setUsername("ecinemab@yahoo.com");
        mailSender.setPassword("ElectronicCinemaBooking132.");
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.ssl.enable", true);
        properties.put("mail.smtp.starttls.enable", true);
        return mailSender;
    }
}