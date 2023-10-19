package com.ecinema.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.enums.UserStatus;
import com.ecinema.backend.enums.UserType;
import com.ecinema.backend.input.UserInput;
import com.ecinema.backend.models.User;
// import com.ecinema.backend.models.UserStatus;
// import com.ecinema.backend.models.UserType;
import com.ecinema.backend.repository.UserRepository;

@Service("userService")
public class UserService {
    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;

    public User createUser(UserInput input){
        User user=new User();

        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setPhoneNumber(input.getPhoneNumber());
        user.setEmail(input.getEmail());
        user.setPassword(input.getPassword());

        user.setUserTypeId(UserType.NONADMIN.ordinal());
        user.setUserStatusId(UserStatus.UNREGISTERED.ordinal());


        return this.userRepository.save(user);

    }

    public List<User>getAllUsers(){
        return this.userRepository.findAll();
    }
    public List<User>getUsersByFirstName(String firstName){
        return this.userRepository.findByFirstNameIgnoreCase(firstName);
    }
    public List<User>getUsersByLastName(String lastName){
        return this.userRepository.findByLastNameIgnoreCase(lastName);
    }
    public List<User> getUsersByPhoneNumber(String phoneNumber){
        return this.userRepository.findByPhoneNumber(phoneNumber);
    }
    public List<User> getUsersByEmail(String email){
        return this.userRepository.findByEmailIgnoreCase(email);
    }
    public List<User> getUsersByFirstNameAndLastName(String firstName, String lastName){
        return this.userRepository.findByFirstNameAndLastNameIgnoreCase(firstName,lastName);
    }
    //findByStatusIgnoreCase(String userStatus)
    // public List<User>getUsersByUserStatus(String userStatus){
    //     return this.userRepository.findByUserStatusIgnoreCase(userStatus);
    // }
    // public List<User>getUsersByUserType(String userType){
    //     return this.userRepository.findByUserTypeIgnoreCase(userType);
    // }
    //address stuff
    // public List<User>getUsersByStreet(String streetName){
    //     return this.userRepository.findByStreetNameIgnoreCase(streetName);
    // }
    // public List<User>getUsersByCity(String city){
    //     return this.userRepository.findByCityIgnoreCase(city); 
    // }
    // public List<User>getUsersByState(String state){
    //     return this.userRepository.findByStateIgnoreCase(state);
    // }
    // public List<User>getUsersByZipcode(String zipcode){
    //     return this.userRepository.findByZipcodeIgnoreCase(zipcode);
    // }

   
}
