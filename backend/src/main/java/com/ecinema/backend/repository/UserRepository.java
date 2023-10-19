package com.ecinema.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.ecinema.backend.models.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long>{
    // public List<User> findByAccountIdContainingIgnoreCase(Long accountId);
    public List<User>findByFirstNameAndLastNameIgnoreCase(String firstName, String lastName);
    public List<User>findByFirstNameIgnoreCase(String firstName);
    public List<User>findByLastNameIgnoreCase(String lastName);

    // public List<User> findByUserStatusIgnoreCase(String userStatus);
    // public List<User> findByUserTypeIgnoreCase(String userType);

    // public List<User> findByStreetNameIgnoreCase(String streetName);
    // public List<User> findByCityIgnoreCase(String city);
    // public List<User> findByStateIgnoreCase(String state);
    // public List<User> findByZipcodeIgnoreCase(String zipcode);


    public List<User> findByPhoneNumber(String phoneNumber);

    public List<User> findByEmailIgnoreCase(String email);
    
}
