import React, {useState} from "react";
import '../css/Seat.css';

function Seat ({seatNumber, onUpdate, remainingSeats, seatCounter, selectedSeats}) {
    const setIfSelected = () => {
        return selectedSeats.includes(seatCounter) ? 'taken' : '';
    }
    
    const [seatState, setSeatState] = useState(setIfSelected());

    const handleClick = () => {
        if (remainingSeats === 0 && seatState === '') {
            window.alert('You have no remaining tickets!');
        } else if (seatState === '') {
            setSeatState('clicked');
            onUpdate("decrement", seatCounter);
        } else if (seatState === 'clicked') {
            setSeatState('');
            onUpdate('increment', seatCounter);
        }
    }
    return (
        <div className= {`seat ${seatState}`} onClick={handleClick}>{seatNumber}</div>
    );
}

export default Seat;