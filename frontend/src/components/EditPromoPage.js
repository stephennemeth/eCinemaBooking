import React, { useState, useEffect } from"react";
//import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EditPromoPage.css";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function EditPromoPage(props) {
    const [promotionCode, setPromoCode] = useState("");
    const [promotionPercent, setPromotionPercent] = useState(0);
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const [promoID,setPromoID]=useState("");

      const handleEditSubmit = async () => {
        props.submitEdit();
        }
    

    const populateInputs=async()=>{
        try {
            const response = await fetch(
              "http://localhost:8080/api/v1/promotion/getPromotionByPromoCode/"+props.promoCode
            );
            const json = await response.json();
      
            if (json) {
                const {
                promoId,
                promoCode,
                discount,
                startDate,
                endDate,
                } = json;
                setPromoID(promoId);
                setPromoCode(promoCode);
                setPromotionPercent(discount);
                setStartDate(startDate);
                setEndDate(endDate);
                console.log(promoCode);
            }
            } catch (error) {
                console.log(error);
            }
    };
    useEffect(() => {
        populateInputs();
      }, []);
    
    return (
        <div id="holder">
        
            <Container id="editPromoContainer">
                {/* promoCode:{promotionCode}
                promotionPercent:{promotionPercent} */}
                <h3 id="promoText">Code</h3>
                <input
                  id="promoCodeInput"
                  type="text"
                  class="form-control mx-auto"
                  placeholder="Promo Code"
                  value={promotionCode}
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPromoCode(e.target.value )}
                ></input>
                <h3 id="promoText">Discount Percent</h3>
                <input
                  id="promoPercentInput"
                  type="text"
                  class="form-contro mx-auto"
                  placeholder="Promo Percentage"
                  value={promotionPercent}
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPromoPercent(e.target.value )}
                ></input>
                <h3 id="promoText">Start Date</h3>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value )}
                    // min={currentDate}
                  />
                <h3 id="promoText">End Date</h3>
                <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value )}
                // min={currentDate}
              />
              <br></br>
              <button id="submitPromoEditBtn" onClick={handleEditSubmit}>submit change</button>
            </Container>
            
        </div>
    );
}
export default EditPromoPage;