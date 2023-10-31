import Button from 'react-bootstrap/Button';
import '../css/SignUpPage.css';
import SignUpConfPage from './SignUpConfPage';
import React, { useState, } from 'react';
import { Modal } from 'react-bootstrap';


function SignUpPage() {
  
  const[firstName, setFirstName]=useState('');
  const[lastName, setLastName]=useState('');
  const[email, setEmail]=useState('');
  const[phoneNumber, setPhoneNumber]=useState('');

  const[password, setPassword]=useState('');
  const[passwordConf, setPasswordConf]=useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const[ccType, setCCType] = useState('');
  const[ccNumber, setCCNumber]=useState('');
  const[ccMonth, setCCMonth]=useState('');
  const[ccYear, setCCYear]=useState('');

  const[ccType2, setCCType2] = useState('');
  const[ccNumber2, setCCNumber2]=useState('');
  const[ccMonth2, setCCMonth2]=useState('');
  const[ccYear2, setCCYear2]=useState('');

  const[ccType3, setCCType3] = useState('');
  const[ccNumber3, setCCNumber3]=useState('');
  const[ccMonth3, setCCMonth3]=useState('');
  const[ccYear3, setCCYear3]=useState('');

  const[baSName, setBASName]=useState('');
  const[baCity, setBaCity]=useState('');
  const[baZip, setBaZip]=useState('');
  const[baState, setBaState]=useState('');

  const [submitted, setSubmitted] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
    ccType: '',
    ccNumber: '',
    ccMonth: '',
    ccYear: '',
    ccType2: '',
    ccNumber2:'',
    ccMonth2:'',
    ccYear2:'',
    ccType3: '',
    ccNumber3:'',
    ccMonth3:'',
    ccYear3:'',
    baSName: '',
    baCity: '',
    baZip: '',
    baState: '',
  });

  const signUp=async(e)=>{

    e.preventDefault()

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (!/\d/.test(password)) {
      alert('Password must contain at least one number');
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert('Password must contain at least one lowercase letter');
      return;
    }
  
    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter');
      return;
    }

    if (password !== passwordConf) {
      setErrorMessage('Passwords do not match');
      setShowErrorModal(true);
      return;
    }
    
    if (partialCreditCardInfo(2) || partialCreditCardInfo(3)) {
      e.preventDefault();
      alert("Please fill out all credit card fields or leave all of them empty.");
      return;
    } 

    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    }
    if (checkAddress()) {
      userData.address = {
        streetName: baSName,
        city: baCity,
        zipcode: baZip,
        state: baState
      }
    }

    const cards = [];

    const addCardIfGiven = (type, number, year, month) => {
      if (type !== '' && number !== '' && year !== '' && month !== '') {
        if (!checkAddress()) {
          alert("Please provide a billing address for your credit card.");
          return;
        }
        cards.push({
          cardType: type,
          cardNumber: number,
          expirationDate: `${year}-${month}-01`,
        });
      }
    }

    addCardIfGiven(ccType, ccNumber, ccYear, ccMonth);
    addCardIfGiven(ccType2, ccNumber2, ccYear2, ccMonth2);
    addCardIfGiven(ccType3, ccNumber3, ccYear3, ccMonth3);
    
    if (cards.length !== 0) {
      userData.cards = cards;
    }

    const response = await fetch("http://localhost:8080/api/v1/user/create", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify(userData)
    })

    updateFormData();
    setSubmitted(true);
  }

  function updateFormData() {
    setFormData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      passwordConfirmation: passwordConf,
      ccType: ccType || 'not entered',
      ccNumber: ccNumber || 'not entered',
      ccMonth: ccMonth || 'not entered',
      ccYear: ccYear || 'not entered',
      ccType2: ccType2 || 'not entered',
      ccNumber2: ccNumber2 || 'not entered',
      ccMonth2: ccMonth2 || 'not entered',
      ccYear2: ccYear2 || 'not entered',
      ccType3: ccType3 || 'not entered',
      ccNumber3: ccNumber3 || 'not entered',
      ccMonth3: ccMonth3 || 'not entered',
      ccYear3: ccYear3 || 'not entered',
      baSName: baSName || 'not entered',
      baCity: baCity || 'not entered',
      baZip: baZip || 'not entered',
      baState: baState || 'not entered'
    });
  }

  function checkAddress() {
    return !(baSName === '' || baState === '' || baCity === '' || baZip === '');
  }

  function partialCreditCardInfo(number) {
    if (number === 2) {
        return ((ccType2 || ccNumber2 || ccMonth2 || ccYear2) && 
               !(ccType2 && ccNumber2 && ccMonth2 && ccYear2));
    } else if (number === 3) {
        return ((ccType3 || ccNumber3 || ccMonth3 || ccYear3) && 
               !(ccType3 && ccNumber3 && ccMonth3 && ccYear3));
    }
    return false;
}

  return (
    <body id="signupbody">
<Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
          Close
        </Button>
      </Modal.Footer>
      </Modal>
      
      {submitted ? (
        <SignUpConfPage formData={formData} />
      ) : (
        <form id="signupform" onSubmit={e=>signUp(e)}>
          <div id="backDiv" className="form-group">
            <div id="headtxt" className="font-weight-bold">
              Signup
            </div>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/* firstname */}
                <span className="rounded-left" class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="text"
                  class="form-control"
                  placeholder="First Name *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={e => setFirstName(e.target.value)}
                ></input>
              </div>

              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/* lastname */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="text"
                  class="form-control"
                  placeholder="Last Name *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={e => setLastName(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/*email */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="email"
                  class="form-control"
                  placeholder="Email *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={e => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/*Phone Number */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="tel"
                  class="form-control"
                  placeholder="Phone Number *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={e => setPhoneNumber(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/*password */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="password"
                  class="form-control"
                  placeholder="Password *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  title="minimum of 8 characters, at least 1 uppercase letter (A-Z), 1 lowercase letter(a-z), 1 number(0-9)"
                  onChange={e => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/*Confirm Password */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={e => setPasswordConf(e.target.value)}
                ></input>
              </div>
            </div>

            {/* RADIO BUTTON HERE */}
            <div id="billtxt">
              <input
                type="checkbox"
                id="contactChoice2"
                name="contact"
                value="phone"
                onChange={() => setShowCreditCard(!showCreditCard)}
              ></input>
              <label id="labelcheckbox">Enter Later?</label>
              <div id="creditcardtxt" className="font-weight-bold ">
                Credit Card Information
              </div>
            </div>

            {showCreditCard && (
              
              <div>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card type*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    required
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Type *"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={e => setCCType(e.target.value)}
                  ></input>
                </div>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card number*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    required
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Number *"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={e => setCCNumber(e.target.value)}
                  ></input>
                </div>

                <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*Month */}
                    <span id="signupinput" class="input-text"></span>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Exp. Month *"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCCMonth(e.target.value)}
                    ></input>
                  </div>

                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*year */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      required
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Exp. Year *"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCCYear(e.target.value)}
                    ></input>
                  </div>
                </div>
{/*Card 2s */}
              <div id="creditcardtxt" className="font-weight-bold ">
                Second Credit Card Information (Optional)
              </div>
                <div>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card type*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Type"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={e => setCCType2(e.target.value)}
                  ></input>
                </div>
                  <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                    {/*Card number*/}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Card Number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCCNumber2(e.target.value)}
                    ></input>
                  </div>

                  <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                    <div className="w-25 p-3 input-group mb-3" id="half-Split">
                      <span id="signupinput" class="input-text"></span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Exp. Month"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={e => setCCMonth2(e.target.value)}
                        ></input>
                    </div>
                  

                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*year */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Exp. Year"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCCYear2(e.target.value)}
                    ></input>
                  </div>
                  </div>
                </div>

{/*card 3 */}
              <div id="creditcardtxt" className="font-weight-bold ">
                Third Credit Card Information (Optional)
              </div>
                <div>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card type*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Type"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={e => setCCType3(e.target.value)}
                  ></input>
                </div>
                  <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                    {/*Card number*/}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Card Number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCCNumber3(e.target.value)}
                    ></input>
                  </div>

                  <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                    <div className="w-25 p-3 input-group mb-3" id="half-Split">
                      <span id="signupinput" class="input-text"></span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Exp. Month"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={e => setCCMonth3(e.target.value)}
                        ></input>
                    </div>
                  

                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*year */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Exp. Year"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCCYear3(e.target.value)}
                    ></input>
                  </div>
                  </div>
                </div>
              
{/*Billing address */}
                {/* Address */}
                <div id="addresstxt" className="font-weight-bold ">
                  Billing Address
                </div>

                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Street Name */}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    required
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Street Name *"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={e => setBASName(e.target.value)}
                  ></input>
                </div>

                <div className="row d-flex justify-content-center align-items-center h-100" id="tri-split">
                  <div className="w-25 p-3 input-group mb-3 mx-auto">
                    {/*Apt Number*/}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      required
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="City*"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setBaCity(e.target.value)}
                    ></input>
                  </div>

                  <div className="w-25 p-3 input-group mb-3 mx-auto">
                    {/*Zip Code */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      required
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Zip Code *"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setBaZip(e.target.value)}
                    ></input>
                  </div>

                  <div className="w-25 p-3 input-group mb-3 mx-auto">
                    {/*State */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      required
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="State *"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setBaState(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

            )}
            <div id="billtxt">
              <input
                type="checkbox"
                id="contactChoice2"
                name="contact"
                value="phone"
              ></input>
              <label id="labelPromoCheckbox">Check to signup for promo codes!</label>
              </div>
            <div id="Button-holderSUP">
                <Button type='submit' className="mx-auto  p-3 input-group mb-3" id="ButtonSubmitSignUp" >Submit</Button>
            </div>
          </div>
        </form>
      )}
    </body>
  );
}

export default SignUpPage;


