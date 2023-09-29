import React, { useState } from 'react';
//import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ManagePromotions.css';

function ManagePromotions() {
    const [currentPromotions, setCurrentPromotions] = useState(["moviesplus", "IloveMovies", "freeMovie"]); // make an api call for this
    const [promotionText, setPromotionText] = useState('');
    const [promotionPercents, setPromotionPercents] = useState([10, 20, 100]);
    const [promotionPercent, setPromotionPercent] = useState(0);

    const removePromo = (indexToRemove) => {
        const newCurrentPromotions = currentPromotions.filter((_, index) => index !== indexToRemove);
        setCurrentPromotions(newCurrentPromotions);
        const newCurrentPercents = promotionPercents.filter((_, index) => index !== indexToRemove); 
        setPromotionPercents(newCurrentPercents);
    }

    const handleTextChange = (e) => {
        setPromotionText(e.target.value);
    }


    const handlePercentChange = (e) => {
        setPromotionPercent(e.target.value);
    }

    const submitPromo = () => {
        if (promotionPercent > 0 && promotionPercent <= 100) {
            setCurrentPromotions(prevCurrentPromotions => [...prevCurrentPromotions, promotionText]);
            setPromotionText('');
            setPromotionPercents(prevCurrentPercents => [...prevCurrentPercents, promotionPercent]);
            setPromotionPercent(0);
        } else {
            window.alert("Please enter a valid promotion percent!");
        }
    } 

    return (
        <div className="promotions-container">
            <div className="current-promotions">
                <h2>Manage Promotions</h2>
                <ul>
                    {currentPromotions.map((promotion, index) => (
                        <div>
                            <li key={index}>
                                {promotion + " "}
                                {promotionPercents[index] + "%"} 
                            </li>
                            <button onClick={() => removePromo(index)}>Remove</button>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="create-promotions">
                <h2>Create Promotion</h2>
                <div className="submission">
                    <div className="submission-grid">
                        <h3>Code</h3>
                        <input type="text" 
                                id="promotion-text"
                                value={promotionText}
                                onChange={handleTextChange}>    
                        </input>
                        <h3>Discount Amount</h3>
                        <input type="text" 
                                id="promotion-percent"
                                value={promotionPercent}
                                onChange={handlePercentChange}>
                        </input>
                        <button className="submit-button" onClick={() => submitPromo()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ManagePromotions;