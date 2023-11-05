import React, { useState, useEffect } from "react";
//import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EditPromoPage.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function EditPromoPage(props) {
    const [promotionCode, setPromoCode] = useState("");
    const [promotionPercent, setPromotionPercent] = useState(0);

    const populateInputs=async()=>{
        try {
            const response = await fetch(
              "http://localhost:8080/api/v1/promotion/getByPromoCode/"+props.promoCode
            );
            const json = await response.json();
      
            if (json) {
                const {
                promoCode,
                discount,
                startDate,
                endDate,
                promoId,
                promoSent,
                } = json;

                setPromoCode(promoCode);
                setPromotionPercent(discount);
                setStartDate(startDate);
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
            hello
            <Container id="editPromoContainer">
                promoCode:{promotionCode}
                promotionPercent:{promotionPercent}
            </Container>
        </div>
    );
}
export default EditPromoPage;