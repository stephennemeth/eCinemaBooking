import '../css/Showtime.css';


function Showtime({setDateTime, setId, dateTime, id}) {

    const dateObject = new Date(dateTime);

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

    const formattedDate = dateObject.toLocaleDateString('en-US', optionsDate);
    const formattedTime = dateObject.toLocaleTimeString('en-US', optionsTime);

    const formattedDateTime = `${formattedTime.replace(' AM', 'am').replace(' PM', 'pm')}`;

    const handleClick = () => {
        setDateTime(dateTime);
        setId(id);
    }

    return (
        <div className="showtime">
            <div>{formattedDate}</div>
            <div>{formattedDateTime}</div>
            <button onClick={handleClick}>Select</button>
        </div>
    )

}

export default Showtime;

