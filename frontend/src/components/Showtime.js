import '../css/Showtime.css';


function Showtime({setDateTime, setId, showDate, startTime, id}) {

    const dateTimeString = `${showDate}T${startTime}`;

    const dateObject = new Date(dateTimeString);

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

    const formattedDate = dateObject.toLocaleDateString('en-US', optionsDate);
    const formattedTime = dateObject.toLocaleTimeString('en-US', optionsTime);

    const formattedDateTime = `${formattedTime.replace(' AM', 'am').replace(' PM', 'pm')}`;

    const handleClick = () => {
        setDateTime(dateTimeString);
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

