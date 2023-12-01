import React, { useState, useEffect } from 'react';
import '../css/UpdateProfilePage.css';
import EditProfilePage from './EditProfilePage';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function UpdateProfilePage(props) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
        state: '',
        city: '',
        streetName: '',
        zipcode: ''
    },
    cards: []
  });

  const [existing, setExisting] = useState([false, false, false]);

  useEffect(() => {
    console.log(existing);
  }, [existing]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    //console.log(storedUser);
    if (storedUser) {
        let newFormData = {
            ...formData,
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            password: storedUser.password,
            email: storedUser.email,
            phoneNumber: storedUser.phoneNumber,
        };

        if (storedUser.address) {
            newFormData = {
                ...newFormData,
                address: {
                  addressId: storedUser.address.addressId,
                  city: storedUser.address.city,
                  state: storedUser.address.state,
                  zipcode: storedUser.address.zipcode,
                  streetName: storedUser.address.streetName
                }
            };
        } else {
          newFormData = {
            ...newFormData,
            address: {
              addressId: '',
              city: '',
              state: '',
              zipcode:'',
              streetName: ''
            }
          }
        }
        let updated = [false, false, false];
        const cardsData = Array(3).fill().map((_, index) => {
          if (storedUser.cards[index]) {
              updated[index] = true;
              return {
                  ccNumber: storedUser.cards[index].cardNumber,
                  ccYear: storedUser.cards[index].expirationDate.substring(0, 4),
                  ccMonth: storedUser.cards[index].expirationDate.substring(5, 7),
                  cardType: storedUser.cards[index].cardType,
                  cardId: storedUser.cards[index].cardId
              }
          }
          return {
            ccNumber: '',
            ccYear: '',
            ccMonth: '',
            cardType: '',
            cardId: ''
          };
        });
        setExisting(updated);

        newFormData = {
          ...newFormData,
          cards: cardsData
        };

        setFormData(newFormData);
    }
}, []);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(formData.email && formData.firstName && formData.lastName && formData.phoneNumber)) {
      alert("Please do not leave any required information blank");
      return;
    }
    if (!checkCreditCards()) {
      alert("Please do not leave any partial credit card information.");
      return;
    } 
    if (!checkBilling()) {
      alert("Please do not leave the billing address partial or excluded if credit card information is provided");
      return;
    }
    let userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      address: formData.address,
    }
    const cards = [];
    let cardIndex = 0;
    console.log(existing);
    for (let card of formData.cards) {
      if (!(existing[cardIndex] === true)) {
        console.log("lala");
        cards.push({
          cardType: card.cardType,
          cardNumber: card.ccNumber,
          expirationDate: `${card.ccYear}-${card.ccMonth}-01`,
        }) 
      } 
      cardIndex++;
    }
    userData.cards = cards;
    console.log(userData);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`http://localhost:8080/api/v1/user/updateProfile/${storedUser.accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userData)
    })

    if (response.ok) {
      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Update was successful");
      setSubmitted(!submitted);
      return;
    } else {
      alert("Update was not successful");
      return;
    }
  };

  function checkCreditCards() {
    if ((formData.cards[0].cardType || formData.cards[0].ccNumber || formData.cards[0].ccMonth || formData.cards[0].ccYear) && 
        !(formData.cards[0].cardType && formData.cards[0].ccNumber && formData.cards[0].ccMonth && formData.cards[0].ccYear)) {
      return false;
    }
    if ((formData.cards[1].cardType || formData.cards[1].ccNumber || formData.cards[1].ccMonth || formData.cards[1].ccYear) && 
        !(formData.cards[1].cardType && formData.cards[1].ccNumber && formData.cards[1].ccMonth && formData.cards[1].ccYear)) {
      return false;
    }
    if ((formData.cards[2].cardType || formData.cards[2].ccNumber || formData.cards[2].ccMonth || formData.cards[2].ccYear) && 
        !(formData.cards[2].cardType && formData.cards[2].ccNumber && formData.cards[2].ccMonth && formData.cards[2].ccYear)) {
      return false;
    }
    return true;
  }

  function checkBilling() {
    if ((formData.address.city || formData.address.state || formData.address.zipcode || formData.address.streetName) && 
        !(formData.address.city && formData.address.state && formData.address.zipcode && formData.address.streetName)) {
      return false;
    }
    if ((formData.cards[0].cardType || formData.cards[1].cardType || formData.cards[2].cardType) &&
        !(formData.address.city && formData.address.state && formData.address.zipcode && formData.address.streetName)) {
      return false;
    }
    return true;
  }

  function isExisting(number) {
    let card = formData.cards[number];
    return card && card.cardType && card.ccNumber && card.ccMonth && (card.ccMonth.length === 2) 
            && card.ccYear && (card.ccYear.length === 4) ? true : false;
  }

  async function deleteCard(number) {
    const result = window.confirm("Are you sure? This cannot be undone.");
    if (result) {
      const updated = [...existing];
      updated[number] = false;
      setExisting(updated);
      let cardId = "";
      if (number === 0) {
        setFormData(prevState => {
          let updatedCards = [...prevState.cards];
          updatedCards[0].cardType = '';
          updatedCards[0].ccNumber = '';
          updatedCards[0].ccMonth = '';
          updatedCards[0].ccYear = '';
          return { ...prevState, cards: updatedCards };
        });        
        cardId = formData.cards[0].cardId;
      } else if (number === 1) {
        setFormData(prevState => {
          let updatedCards = [...prevState.cards];
          updatedCards[1].cardType = '';
          updatedCards[1].ccNumber = '';
          updatedCards[1].ccMonth = '';
          updatedCards[1].ccYear = '';
          return { ...prevState, cards: updatedCards };
        });    
        cardId = formData.cards[1].cardId;
      } else if (number === 2) {
        setFormData(prevState => {
          let updatedCards = [...prevState.cards];
          updatedCards[2].cardType = '';
          updatedCards[2].ccNumber = '';
          updatedCards[2].ccMonth = '';
          updatedCards[2].ccYear = '';
          return { ...prevState, cards: updatedCards };
        });    
        cardId = formData.cards[2].cardId;
      }
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!cardId) {  
        alert("Card does not exist");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/v1/user/deleteCard/${storedUser.accountId}/${cardId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } else if (response.status === 404) {
            const message = await response.json();
            alert(message);
        } else {
            //console.log(response.status);
            alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the card.");
      }
    } else {
      return;
    }
  }

  const handleChangePassword = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    navigate('/changepassword/password', { state : { props : { userId: storedUser.accountId }}});
  }

  return (
    <div id="uPPage">
      {submitted ? (
        <EditProfilePage formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} deleteCard={deleteCard} 
                          isExisting={isExisting} handleChangePassword={handleChangePassword}/>
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
              <div className='' id="billingText">State: {formData.address.state}</div>
              <div className='' id="billingText">City: {formData.address.city}</div>
              <div className='' id="billingText">Street Name: {formData.address.streetName}</div>
              <div className='' id="billingText">Zip Code: {formData.address.zipcode}</div>
            </div>
          </div>

          <div id="buttonHolder">
            <Button type='submit' id="EditProfileBtn" className="d-flex mx-auto mb-3 font-weight-bold" onClick={() => setSubmitted(!submitted)} > Edit Profile</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateProfilePage;

