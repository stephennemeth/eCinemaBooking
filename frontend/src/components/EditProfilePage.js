import React, {useState} from "react"
import Button from 'react-bootstrap/Button';
function EditProfilePage({handleSubmit }){

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

    return(
        <form id="signupform" onSubmit={handleSubmit}>
          <div id="backDiv" className="form-group">
            <div id="headtxt" className="font-weight-bold">
              Edit Information
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
                  value={formData.firstName}
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
                  value={formData.lastName}
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
                  value={formData.email}
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
                  value={formData.phoneNumber}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                ></input>
              </div>
            </div>

            {/* <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                
                <span class="input-text" id="basic-addon1"></span>
                <input
                  id="signupinput"
                  type="password"
                  class="form-control"
                  placeholder="Password *"
                  value={formData.password}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                ></input>
              </div>

              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                
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
            </div> */}

            {/* RADIO BUTTON HERE */}
            <div id="billtxt">
              <input
                type="checkbox"
                id="contactChoice2"
                name="contact"
                value="phone"
                // onChange={() => setShowCreditCard(!showCreditCard)}
              ></input>
              <label id="labelcheckbox">Enter Later?</label>
              <div id="creditcardtxt" className="font-weight-bold ">
                Credit Card Information
              </div>
            </div>

            {/* {showCreditCard && ( */}
              <div>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card number*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                   
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Number *"
                    value={formData.ccNumber}
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
                      
                      type="text"
                      class="form-control"
                      placeholder="Exp. Month *"
                      value={formData.ccMonth}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setFormData({ ...formData, ccMonth: e.target.value })}
                    ></input>
                  </div>

                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*year */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Exp. Year *"
                      value={formData.ccYear}
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
                    
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Street Name *"
                    value={formData.baSName}
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
                      value={formData.baAptNumber}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setFormData({ ...formData, baAptNumber: e.target.value })}
                    ></input>
                  </div>

                  <div className="w-25 p-3 input-group mb-3 mx-auto">
                    {/*Zip Code */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="Zip Code *"
                      value={formData.baZip}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setFormData({ ...formData, baZip: e.target.value })}
                    ></input>
                  </div>

                  <div className="w-25 p-3 input-group mb-3 mx-auto">
                    {/*State */}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="State *"
                      value={formData.baState}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setFormData({ ...formData, baState: e.target.value })}
                    ></input>
                  </div>
                </div>
              </div>
            {/* )} */}

            <Button type='submit' style={{right:'43%',left:'43%'}} className="mx-auto w-15 p-3 input-group mb-3" id="ButtonSubmitSignUp">Submit</Button>
          </div>
        </form>
    );
}
export default EditProfilePage;