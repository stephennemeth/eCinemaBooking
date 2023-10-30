package com.ecinema.backend.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.enums.UserStatus;
import com.ecinema.backend.enums.UserType;
import com.ecinema.backend.input.AddressInput;
import com.ecinema.backend.input.PaymentInput;
import com.ecinema.backend.input.UserInput;
import com.ecinema.backend.models.User;
import com.ecinema.backend.models.Address;
import com.ecinema.backend.models.Payment;
// import com.ecinema.backend.models.UserStatus;
// import com.ecinema.backend.models.UserType;
import com.ecinema.backend.repository.UserRepository;
import com.ecinema.backend.repository.AddressRepository;
import com.ecinema.backend.repository.PaymentRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;


@Service("userService")
public class UserService {
    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;

    @Autowired
    @Qualifier("addressRepository")
    private AddressRepository addressRepository;

    @Autowired
    @Qualifier("paymentRepository")
    private PaymentRepository paymentRepository;


    public User createUser(UserInput input){
        User user=new User();

        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setPhoneNumber(input.getPhoneNumber());
        user.setEmail(input.getEmail());
        user.setPassword(input.getPassword());

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
        List<PaymentInput> payments = input.getPayments();

        if (payments != null && addressInput != null) {
            for (PaymentInput card : payments) {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                java.util.Date utilDate;
                java.sql.Date sqlDate;
            
                try {
                    utilDate = format.parse(card.getExpirationDate());
                    sqlDate = new java.sql.Date(utilDate.getTime());
                } catch (Exception e) {
                    e.printStackTrace();
                    continue; 
                }
            
                Payment newCard = Payment.builder()
                .user(user) 
                .cardNumber(card.getCardNumber())
                .cardType(card.getCardType())
                .expirationDate(sqlDate)
                .billingAddressStreet(addressInput.getStreetName())
                .billingAddressZip(Integer.toString(addressInput.getZipcode()))
                .build();
                user.getCards().add(newCard);
            }
        }
        return this.userRepository.save(user);
    }

    public User updateUser(User user, UserInput input) {
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setPhoneNumber(input.getPhoneNumber());
        user.setPassword(input.getPassword());
        AddressInput addressInput = input.getAddress();
        Address userAddress = user.getAddress();
        if (addressInput.getStreetName().isEmpty()) {
            if (userAddress != null) {
                user.setAddress(null);
                this.addressRepository.delete(userAddress);
            }
        } else {
            userAddress.setStreetName(addressInput.getStreetName());
            userAddress.setCity(addressInput.getCity());
            userAddress.setState(addressInput.getState());
            userAddress.setZipcode(addressInput.getZipcode());
            user.setAddress(userAddress);
        }
        List<PaymentInput> newPayment = input.getPayments();

        for (PaymentInput card : newPayment) {
            if (!(card.getCardType().isEmpty()) && !(addressInput.getStreetName().isEmpty())) {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                java.util.Date utilDate;
                java.sql.Date sqlDate;
            
                try {
                    utilDate = format.parse(card.getExpirationDate());
                    sqlDate = new java.sql.Date(utilDate.getTime());
                } catch (Exception e) {
                    e.printStackTrace();
                    continue; 
                }
            
                Payment newCard = Payment.builder()
                .user(user) 
                .cardNumber(card.getCardNumber())
                .cardType(card.getCardType())
                .expirationDate(sqlDate)
                .billingAddressStreet(addressInput.getStreetName())
                .billingAddressZip(Integer.toString(addressInput.getZipcode()))
                .build();
                user.getCards().add(newCard);
            }
        }
        return this.userRepository.save(user);
    }

    public void saveUser(User user) {
        this.userRepository.save(user);
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

        System.out.println(user.getPassword());
        user.setPassword(newPassword);


        this.userRepository.save(user);
    }
    public void updateUserStatusId(User user, int val) {
        user.setUserStatusId(val);
        this.userRepository.save(user);
    }

    public User getUserById(Long userId) {
        return this.userRepository.findById(userId).orElse(null);
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
