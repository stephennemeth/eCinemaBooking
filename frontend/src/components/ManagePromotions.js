import React, { useState, useEffect } from"react";
//import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ManagePromotions.css";
import EditPromoPage from "./EditPromoPage.js";
import { useNavigate } from "react-router-dom";

function ManagePromotions() {
  const [currentPromotions, setCurrentPromotions] = useState([]); // make an api call for this
  const [promotionText, setPromotionText] = useState("");
  const [promotionPercents, setPromotionPercents] = useState([]);
  const [promotionPercent, setPromotionPercent] = useState(0);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEditing,setisEditing]=useState(false);
  const [promoCodeEdit,setPromoCodeEdit]=useState("");

  const getAllPromotions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/promotion/getAllPromotions"
      );
      const json = await response.json();
      setCurrentPromotions(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPromotions();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null || user.userTypeId !== 1) {
      navigate("/");
    }
  });

  const removePromo = (indexToRemove) => {
    const newCurrentPromotions = currentPromotions.filter(
      (_, index) => index !== indexToRemove
    );
    setCurrentPromotions(newCurrentPromotions);
    const newCurrentPercents = promotionPercents.filter(
      (_, index) => index !== indexToRemove
    );
    setPromotionPercents(newCurrentPercents);
  };

  const handleEditButton=(promoCode)=>{
    setPromoCodeEdit(promoCode)
    setisEditing(true);
  }

  const handleSubmitEdit=(e)=>{
    setisEditing(false);
    window.location.reload(false);
  }

  const handleTextChange = (e) => {
    setPromotionText(e.target.value);
  };

  const handlePercentChange = (e) => {
    setPromotionPercent(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const submitPromo = async () => {
    if (!promotionText || promotionText.trim() === "") {
      window.alert("Please enter a promotion code.");
    } else if (promotionPercent <= 0 || promotionPercent > 100) {
      window.alert(
        "Please enter a valid promotion percent (between 1 and 100)."
      );
    } else if (!startDate) {
      window.alert("Please select a start date.");
    } else if (!endDate) {
      window.alert("Please select an end date.");
    } else {
      // Create an object with the promotion data to send to the API.
      const newPromotion = {
        promoCode: promotionText,
        discount: promotionPercent,
        startDate,
        endDate,
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/promotion/addPromotion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPromotion),
          }
        );

        if (response.ok) {
          getAllPromotions();
          setPromotionText("");
          setPromotionPercent(0);
          window.location.reload(false);
        } else {
          console.log("Response status:", response.status);
          const responseBodyText = await response.text();
          console.log("Response body:", responseBodyText);

          if (responseBodyText === "Promo code already exists.") {
            window.alert(
              "Promo code already exists. Please enter a different one."
            );
          } else {
            console.log("Promotion creation failed");
          }
        }
      } catch (error) {
        console.error("Error creating promotion:", error);
      }
    }
  };

  const sendPromotionToUsers = async (promoId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/promotion/sendPromotion/${promoId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        console.log("Promotion sending failed");
      }
    } catch (error) {
      console.error("Error sending promotion:", error);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setStartDate(formattedDate);
  }, []);

  return (
    <div className="holdAll">
      {isEditing ? (
      <EditPromoPage promoCode={promoCodeEdit} submitEdit={handleSubmitEdit}/>
    ) : (
      <div className="promotions-container">
        <div className="current-promotions">
          <h2 id="promoTextTop">Manage Promotions</h2>
          <ul className="promoList-cont">
            {currentPromotions.map((promotion) => (
              <div key={promotion.promoId}>
                <li>
                  {promotion.promoCode + " "} {promotion.discount + "%"}
                </li>
                <button className="editPromoBtn"
                  onClick={() => sendPromotionToUsers(promotion.promoId)}
                  disabled={promotion.promoSent}
                >
                  Send
                </button>
                <button onClick={() => handleEditButton(promotion.promoCode)} className="editPromoBtn">
                  Edit
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div className="create-promotions">
          <h2 id="promoTextTop">Create Promotion</h2>
          <div className="submission">
            <div className="submission-grid">
              <h3 id="promoText">Code</h3>
              <input
                type="text"
                id="promotion-text"
                value={promotionText}
                onChange={handleTextChange}
              ></input>
              <h3 id="promoText">Discount Percent</h3>
              <input
                type="text"
                id="promotion-percent"
                value={promotionPercent}
                onChange={handlePercentChange}
              ></input>
              {startDate && (
                <>
                  <h3 id="promoText">Start Date</h3>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={currentDate}
                  />
                </>
              )}
              <h3 id="promoText">End Date</h3>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                min={currentDate}
              />
              <button className="submit-button" onClick={() => submitPromo()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      </div>
  );
}
export default ManagePromotions;