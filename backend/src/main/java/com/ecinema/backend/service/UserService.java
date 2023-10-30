package com.ecinema.backend.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.enums.UserStatus;
import com.ecinema.backend.enums.UserType;
import com.ecinema.backend.input.AddressInput;

import com.ecinema.backend.input.UserInput;
import com.ecinema.backend.models.User;
import com.ecinema.backend.models.Address;
// import com.ecinema.backend.models.UserStatus;
// import com.ecinema.backend.models.UserType;
import com.ecinema.backend.repository.UserRepository;
import com.ecinema.backend.repository.AddressRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Service("userService")
public class UserService {
    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;

    @Autowired
    @Qualifier("addressRepository")
    private AddressRepository addressRepository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User createUser(UserInput input){
        User user=new User();

        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setPhoneNumber(input.getPhoneNumber());
        user.setEmail(input.getEmail());
        String encodedPassword = passwordEncoder.encode(input.getPassword());
        user.setPassword(encodedPassword);

        user.setUserTypeId(UserType.NONADMIN.ordinal());
        user.setUserStatusId(UserStatus.UNREGISTERED.ordinal());

       AddressInput addressInput = input.getAddress();
        if (addressInput != null) {
            Address address = new Address();
            address.setStreetName(addressInput.getStreetName());
            address.setCity(addressInput.getCity());
            address.setState(addressInput.getState());
            address.setZipcode(addressInput.getZipcode());
            
            Address savedAddress = addressRepository.save(address);
            // Associate the Address with the User
            user.setAddress(savedAddress);
        }

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
    public User getUsersByEmail(String email){
        return this.userRepository.findByEmailIgnoreCase(email);
    }
    public List<User> getUsersByFirstNameAndLastName(String firstName, String lastName){
        return this.userRepository.findByFirstNameAndLastNameIgnoreCase(firstName,lastName);
    }

    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword(this.passwordEncoder.encode(newPassword));

        this.userRepository.save(user);
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
