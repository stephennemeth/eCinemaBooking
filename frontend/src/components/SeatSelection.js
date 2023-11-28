import React, {useEffect, useState, useCallback} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SeatSelection.css';
import Seat from './Seat';

function SeatSelection() {
    const location = useLocation();
    const seats = location.state.seats;
    let selectedSeats = [];
    for (let seat of seats) {
        if (seat.seatStatusId === 1) selectedSeats.push(seat.seatId);
    }
    const [displayedSeats, setDisplayedSeats] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const initialSeatsRemaining = location.state.numChildren + location.state.numAdult + location.state.numElderly;
    const [currentSeatsRemaining, setCurrentSeatsRemaining] = useState(initialSeatsRemaining);
    const navigate = useNavigate();

    const updateSeats = useCallback((changeSeats, seatCounter, id) => {
        console.log()
        setCurrentSeatsRemaining((prev) => {
            if (changeSeats === "decrement") {
                setUserSelected(prevUserSelected => [...prevUserSelected, id]);
                return prev - 1;
            } else if (changeSeats === "increment") {
                setUserSelected(prevUserSelected => prevUserSelected.filter(seat => seat !== id));
                return prev + 1;
            }
        });
      }, []);
    
    const handleNavigation = (path) => {
        if (currentSeatsRemaining !== 0) {
            alert("You must use all seats");
            return;
        }
        if (path === "go back") {
            navigate("/");
        } else if (path === "continue") {
            navigate("/ordersum", {state: {movieTitle: location.state.movieTitle, 
                                            showtime: location.state.showtime, 
                                            showtimeId: location.state.showtimeId, 
                                            numChildren: location.state.numChildren, 
                                            numAdult: location.state.numAdult, 
                                            numElderly: location.state.numElderly, 
                                            accountId: location.state.accountId,
                                            childRate: 5.5, 
                                            adultRate: 8.5, 
                                            elderlyRate: 3.5, 
                                            selectedSeats: userSelected}});
        }
    }
    useEffect(() => {
        const newSeats = [];
        let seatCounter = 0;
        let idCounter = seats[0].seatId;
        for (let i = 0; i < 4; i++) {
            let counter = 1;
            for (let j = 1; j <= 2; j++) {
                const column = [];
                for (let k = 1; k <= 8; k++) {
                    const seatLetter = String.fromCharCode(65 + i);
                    const seatNumber = seatLetter + counter;
                    column.push(<Seat seatNumber={seatNumber} onUpdate={updateSeats} id={idCounter}
                                remainingSeats={currentSeatsRemaining} seatCounter={seatCounter} selectedSeats={selectedSeats}
                                />);
                    idCounter++;
                    counter++;
                    seatCounter++;
                }
                newSeats.push(column);
            }
        }
        setDisplayedSeats(newSeats);
    }, [currentSeatsRemaining]);

    return(
        <div className="selection-page">
            <div className="theater">
                <div className="seats">
                    <div className="love-seat">
                        {displayedSeats[0]}
                        {displayedSeats[1]}
                    </div>
                    <div className="love-seat">
                        {displayedSeats[2]}
                        {displayedSeats[3]}
                    </div>
                    <div className="love-seat">
                        {displayedSeats[4]}
                        {displayedSeats[5]}
                    </div>
                    <div className="love-seat">
                        {displayedSeats[6]}
                        {displayedSeats[7]}
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