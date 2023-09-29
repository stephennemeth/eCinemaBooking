import Button from 'react-bootstrap/Button';
import '../css/SignUpPage.css';
import SignUpConfPage from './SignUpConfPage';
import React, { useState } from 'react';

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
    baSName: 'not entered',
    baAptNumber: '',
    baZip: '',
    baState: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }

    setSubmitted(true);
  };

  return (
    <body id="signupbody">
      {submitted ? (
        <SignUpConfPage formData={formData} />
      ) : (
        <form id="signupform" onSubmit={handleSubmit}>
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
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                ></input>
              </div>

              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/*Phone Number */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="text"
                  class="form-control"
                  placeholder="Phone Number *"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, passwordConfirmation: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, ccNumber: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, ccMonth: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, ccYear: e.target.value })}
                    ></input>
                  </div>
                </div>

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
                    onChange={(e) => setFormData({ ...formData, baSName: e.target.value })}
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
                      placeholder="Apt/Unit Number *"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setFormData({ ...formData, baAptNumber: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, baZip: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, baState: e.target.value })}
                    ></input>
                  </div>
                </div>
              </div>
            )}
            <div id="Button-holderSUP">
                <Button type='submit' className="mx-auto  p-3 input-group mb-3" id="ButtonSubmitSignUp">Submit</Button>
            </div>
          </div>
        </form>
      )}
    </body>
  );
}

export default SignUpPage;
