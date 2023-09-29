import React, {useEffect, useState, useCallback} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SeatSelection.css';
import Seat from './Seat';

function SeatSelection() {
    const [seats, setSeats] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedSeats = [3, 12, 24, 56, 23];
    const [userSelected, setUserSelected] = useState([]);
    const location = useLocation();
    const initialSeatsRemaining = location.state ? location.state.myProp : 0;
    const [currentSeatsRemaining, setCurrentSeatsRemaining] = useState(initialSeatsRemaining);
    const navigate = useNavigate();
    const updateSeats = useCallback((changeSeats, seatCounter) => {
        setCurrentSeatsRemaining((prev) => {
            if (changeSeats === "decrement") {
                setUserSelected(prevUserSelected => [...prevUserSelected, seatCounter]);
                return prev - 1;
            } else if (changeSeats === "increment") {
                setUserSelected(prevUserSelected => prevUserSelected.filter(seat => seat !== seatCounter));
                return prev + 1;
            }
        });
      }, []);
    
    const handleNavigation = (path) => {
        if (path === "go back") {
            navigate("/");
        } else if (path === "continue") {
            navigate("/ManagePromotions");
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const newSeats = [];
        let seatCounter = 0;
        for (let i = 0; i < 4; i++) {
            let counter = 1;
            for (let j = 1; j <= 2; j++) {
                const column = [];
                for (let k = 1; k <= 8; k++) {
                    const seatLetter = String.fromCharCode(65 + i);
                    const seatNumber = seatLetter + counter;
                    column.push(<Seat seatNumber={seatNumber} onUpdate={updateSeats} 
                                remainingSeats={currentSeatsRemaining} seatCounter={seatCounter} selectedSeats={selectedSeats}
                                />);
                    counter++;
                    seatCounter++;
                }
                newSeats.push(column);
            }
        }
        setSeats(newSeats);
    }, [updateSeats, currentSeatsRemaining, selectedSeats]);

    return(
        <div className="selection-page">
            <div className="theater">
                <div className="seats">
                    <div className="love-seat">
                        {seats[0]}
                        {seats[1]}
                    </div>
                    <div className="love-seat">
                        {seats[2]}
                        {seats[3]}
                    </div>
                    <div className="love-seat">
                        {seats[4]}
                        {seats[5]}
                    </div>
                    <div className="love-seat">
                        {seats[6]}
                        {seats[7]}
                    </div>
                </div>
                <div className="screen">
                    <p>Screen</p>
                </div>
            </div>
            <div className="ticket-display">
                <h1>Tickets Remaining: {currentSeatsRemaining}</h1>
                <div className="buttons">
                    <button className="btn" id="continue" onClick={() => handleNavigation("continue")}>Checkout</button>
                    <button className="btn" id="go-back" onClick={() => handleNavigation("go back")}>Go Back</button>
                </div>
            </div>
        </div>
    );
} 

export default SeatSelection;