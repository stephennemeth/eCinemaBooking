import Button from 'react-bootstrap/Button';
import '../css/SignUpPage.css';
import SignUpConfPage from './SignUpConfPage';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function SignUpPage() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
    ccNumber: 'not entered',
    ccMonth: '',
    ccYear: '',
    ccNumber2:'',
    ccMonth2:'',
    ccYear2:'',
    ccNumber3:'',
    ccMonth3:'',
    ccYear3:'',
    baSName: 'not entered',
    baCity: '',
    baZip: '',
    baState: '',
  });
  const[firstName, setFirstName]=useState('');
  const[lastName, setLastName]=useState('');
  const[email, setEmail]=useState('');
  const[phoneNumber, setPhoneNumber]=useState('');


  const[password, setPassword]=useState('');
  const[passwordConf, setPasswordConf]=useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);


  const[ccNumber, setCCNumber]=useState('');
  const[ccMonth, setCCMonth]=useState('');
  const[ccYear, setCCYear]=useState('');

  const[ccNumber2, setCCNumber2]=useState('');
  const[ccMonth2, setCCMonth2]=useState('');
  const[ccYear2, setCCYear2]=useState('');

  const[ccNumber3, setCCNumber3]=useState('');
  const[ccMonth3, setCCMonth3]=useState('');
  const[ccYear3, setCCYear3]=useState('');

  const[baSName, setBASName]=useState('');
  const[baCity, setBaCity]=useState('');
  const[baZip, setBaZip]=useState('');
  const[baState, setBaState]=useState('');

 
  

  const [submitted, setSubmitted] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(true);

  const signUp=async(e)=>{
    if (password !== passwordConf) {
      e.preventDefault();
      setErrorMessage('Passwords do not match');
      setShowErrorModal(true);
      return;
    }
    e.preventDefault()

    const response = await fetch("http://localhost:8080/api/v1/user/create", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify({
        firstName : firstName,
        lastName : lastName,
        email : email,
        phoneNumber : phoneNumber,
        password : password,
        address:{
          streetName:baSName,
          city:baCity,
          state:baState,
          zipcode:baZip
        }
      })
    })
    const updatedFormData = {
      ...formData,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      ccNumber: ccNumber,
      ccMonth: ccMonth,
      ccYear: ccYear,
      ccNumber2:ccNumber2,
      ccMonth2:ccMonth2,
      ccYear2:ccYear2,
      ccNumber3:ccNumber3,
      ccMonth3:ccMonth3,
      ccYear3:ccYear3,
      baSName: baSName,
      baCity: baCity,
      baZip: baZip,
      baState: baState,
    };
  
    setFormData(updatedFormData);

    setSubmitted(true);
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { password, passwordConfirmation } = formData;

  //   if (password !== passwordConfirmation) {
  //     alert('Passwords do not match');
  //     return;
  //   }

  //   setSubmitted(true);
  // };

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

