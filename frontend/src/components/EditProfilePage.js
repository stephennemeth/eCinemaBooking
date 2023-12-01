import '../css/EditProfilePage.css';
import React, {useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function EditProfilePage({formData, setFormData, handleSubmit, deleteCard, isExisting, handleChangePassword }){

  const navigate = useNavigate();

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
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                ></input>
              </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
              <div className="w-25 p-3 input-group mb-3" id="half-Split">
                {/*email */}
                <span class="input-text" id="basic-addon1"></span>
                <input
                  required
                  id="signupinput"
                  type="email"
                  class="form-control"
                  placeholder="Email *"
                  value={formData.email}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled="disabled"
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
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                ></input>
              </div>
            </div>
            <Button id="forgot-password-button" onClick={handleChangePassword}>Change Password</Button>

              <div id="creditcardtxt" className="font-weight-bold ">
                Credit Card Information
              </div>
              <div>
                <div id="creditcardtxt" className="font-weight-bold ">Card 1</div>
                <button class="delete-card-btn" onClick={() => deleteCard(0)}>Delete Card</button>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card type*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Type"
                    value={formData.cards[0]?.cardType || ''}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={isExisting(0)}
                    onChange={(e) => {
                      const updatedCards = [...formData.cards];
                      updatedCards[0].cardType = e.target.value;
                      setFormData({ ...formData, cards: updatedCards });
                    }}
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
                    value={formData.cards[0]?.ccNumber || ''}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={isExisting(0)}
                    onChange={(e) => {
                      const updatedCards = [...formData.cards];
                      updatedCards[0].ccNumber = e.target.value;
                      setFormData({ ...formData, cards: updatedCards });
                    }}
                  ></input>
                </div>
                <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*Month */}
                    <span id="signupinput" class="input-text"></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Exp. Month"
                      value={formData.cards[0]?.ccMonth || ''}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled={isExisting(0)}
                      onChange={(e) => {
                        const updatedCards = [...formData.cards];
                        updatedCards[0].ccMonth = e.target.value;
                        setFormData({ ...formData, cards: updatedCards });
                      }}
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
                      value={formData.cards[0]?.ccYear || ''}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled={isExisting(0)}
                      onChange={(e) => {
                        const updatedCards = [...formData.cards];
                        updatedCards[0].ccYear = e.target.value;
                        setFormData({ ...formData, cards: updatedCards });
                      }}
                    ></input>
                  </div>
                </div>

                <div id="creditcardtxt" className="font-weight-bold ">Card 2</div>
                <button class="delete-card-btn" onClick={() => deleteCard(1)}>Delete Card</button>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card type*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Type"
                    value={formData.cards[1]?.cardType || ''}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={isExisting(1)}
                    onChange={(e) => {
                      const updatedCards = [...formData.cards];
                      updatedCards[1].cardType = e.target.value;
                      setFormData({ ...formData, cards: updatedCards });
                    }}
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
                    value={formData.cards[1]?.ccNumber || ''}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={isExisting(1)}
                    onChange={(e) => {
                      const updatedCards = [...formData.cards];
                      updatedCards[1].ccNumber = e.target.value;
                      setFormData({ ...formData, cards: updatedCards });
                    }}
                  ></input>
                </div>
                <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*Month */}
                    <span id="signupinput" class="input-text"></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Exp. Month"
                      value={formData.cards[1]?.ccMonth || ''}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled={isExisting(1)}
                      onChange={(e) => {
                        const updatedCards = [...formData.cards];
                        updatedCards[1].ccMonth = e.target.value;
                        setFormData({ ...formData, cards: updatedCards });
                      }}
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
                      value={formData.cards[1]?.ccYear || ''}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled={isExisting(1)}
                      onChange={(e) => {
                        const updatedCards = [...formData.cards];
                        updatedCards[1].ccYear = e.target.value;
                        setFormData({ ...formData, cards: updatedCards });
                      }}
                    ></input>
                  </div>
                </div>

                <div id="creditcardtxt" className="font-weight-bold ">Card 3</div>
                <button class="delete-card-btn" onClick={() => deleteCard(2)}>Delete Card</button>
                <div className="w-25 p-3 input-group mb-3 mx-auto" id="full-Split">
                  {/*Card type*/}
                  <span class="input-text" id="basic-addon1"></span>
                  <input
                    id="signupinput"
                    type="text"
                    class="form-control"
                    placeholder="Card Type"
                    value={formData.cards[2]?.cardType || ''}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={isExisting(2)}
                    onChange={(e) => {
                      const updatedCards = [...formData.cards];
                      updatedCards[2].cardType = e.target.value;
                      setFormData({ ...formData, cards: updatedCards });
                    }}
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
                    value={formData.cards[2]?.ccNumber || ''}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={isExisting(2)}
                    onChange={(e) => {
                      const updatedCards = [...formData.cards];
                      updatedCards[2].ccNumber = e.target.value;
                      setFormData({ ...formData, cards: updatedCards });
                    }}
                  ></input>
                </div>
                <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                  <div className="w-25 p-3 input-group mb-3" id="half-Split">
                    {/*Month */}
                    <span id="signupinput" class="input-text"></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Exp. Month"
                      value={formData.cards[2]?.ccMonth || ''}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled={isExisting(2)}
                      onChange={(e) => {
                        const updatedCards = [...formData.cards];
                        updatedCards[2].ccMonth = e.target.value;
                        setFormData({ ...formData, cards: updatedCards });
                      }}
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
                      value={formData.cards[2]?.ccYear || ''}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled={isExisting(2)}
                      onChange={(e) => {
                        const updatedCards = [...formData.cards];
                        updatedCards[2].ccYear = e.target.value;
                        setFormData({ ...formData, cards: updatedCards });
                      }}
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
                    value={formData.address.streetName}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      const updatedAddress = { ...formData.address, streetName: e.target.value };
                      setFormData({ ...formData, address: updatedAddress });
                    }}
                  ></input>
                </div>

                <div className="row d-flex justify-content-center align-items-center h-100" id="tri-split">
                  <div className="w-25 p-3 input-group mb-3 mx-auto">
                    {/*City*/}
                    <span class="input-text" id="basic-addon1"></span>
                    <input
                      id="signupinput"
                      type="text"
                      class="form-control"
                      placeholder="City *"
                      value={formData.address.city}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        const updatedAddress = { ...formData.address, city: e.target.value };
                        setFormData({ ...formData, address: updatedAddress });
                    }}
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
                      value={formData.address.zipcode}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        const updatedAddress = { ...formData.address, zipcode: e.target.value };
                        setFormData({ ...formData, address: updatedAddress });
                      }}
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
                      value={formData.address.state}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        const updatedAddress = { ...formData.address, state: e.target.value };
                        setFormData({ ...formData, address: updatedAddress });
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            {/* )} */}
            <div id="billtxt">
              <input
                type="checkbox"
                id="contactChoice2"
                name="contact"
                value="phone"
              ></input>
              <label id="labelPromoCheckbox">Check to signup for promo codes!</label>
              </div>

            <Button type='submit' style={{right:'43%',left:'43%'}} className="mx-auto w-15 p-3 input-group mb-3" id="ButtonSubmitEdit">Submit</Button>
          </div>
        </form>
    );
}
export default EditProfilePage;