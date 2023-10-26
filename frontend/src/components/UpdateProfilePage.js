import React, { useState, useEffect } from 'react';
import '../css/UpdateProfilePage.css';
import EditProfilePage from './EditProfilePage'
import Button from 'react-bootstrap/Button';

function UpdateProfilePage(props) {

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => { 
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
      if (storedUser) {
        setFormData({
          firstName: storedUser.firstName,
          lastName: storedUser.lastName,
          password: storedUser.password,
          email: storedUser.email,
          phoneNumber: storedUser.phoneNumber,
          billingAddressCity: storedUser.address.city,
          billingAddressState: storedUser.address.state,
          billingAddressStreet: storedUser.address.streetName,
          billingAddressZip: storedUser.address.zipcode
        });
      }
    }, []);


  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();


    setSubmitted(!submitted);
  };

  return (
    <div id="uPPage">
      {submitted ? (
        <EditProfilePage formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
      ) : (
        <>
          <div id="SCTopText" className="mx-auto mb-3 font-weight-bold">
            <h1>Profile Information</h1>
          </div>
          
          <div id="confirmationBod" className="mx-auto mb-3 ">
            <h4 id="yourDetailTxt">Your details</h4>
            <div id="confFormGenInfo">
              <div className=''>First Name: {formData.firstName} </div>
              <div id="detailText" className=''>Last Name: {formData.lastName}</div>
              <div id="detailText" className=''>Email: {formData.email}</div>
              <div id="detailText" className=''>Phone number: {formData.phoneNumber}</div>
            </div>
            <h4 id="yourBillingAdd">Your Billing Address</h4>
            <div id="confFormBod">
              <div className='' id="billingText">State: {formData.billingAddressState}</div>
              <div className='' id="billingText">City: {formData.billingAddressCity}</div>
              <div className='' id="billingText">Street Name: {formData.billingAddressStreet}</div>
              {/* Not sure if we actually need this
              <div className='' id="billingText">Building/Apartment number: {formData.baAptNumber} </div> 
              */}
              <div className='' id="billingText">Zip Code: {formData.billingAddressZip}</div>
            </div>
          </div>

          <div id="buttonHolder">
            <Button type='submit' id="EditProfileBtn" className="d-flex mx-auto mb-3 font-weight-bold" onClick={handleSubmit} > Edit Profile</Button>
            {/* <Button id="changePasswordBtn" className="mx-auto mb-3 font-weight-bold" > Change Password</Button> */}
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateProfilePage;
