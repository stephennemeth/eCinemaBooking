package com.ecinema.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.ecinema.backend.models.Address;

@Repository("addressRepository")
public interface AddressRepository extends JpaRepository<Address, Long>{
    List<Address> findByStreetNameIgnoreCase(String streetName);
    List<Address> findByCityIgnoreCase(String city);
    List<Address> findByStateIgnoreCase(String state);
    List<Address> findByZipcode(int zipcode);
}
