import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import "../css/MovieItem.css";
import { Button, Card, Stack} from "react-bootstrap";
import TrailerModal from "./TrailerModal";

const MovieItem = (props) => {

    const [showModal, setShowModal] = useState(false)

    const changeModal = () => {
        setShowModal(!showModal)
    }

    const navigate = useNavigate();

    const handleNavigation = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.accountId) {
            alert("You must be logged in to book a movie!");
            return;
        }
        navigate('/Booking', { state: {movieTitle: props.movie.movieTitle, movieId: props.movie.movieId}} )
    }

    return (

        <Card className="movie-item-card">
            <Card.Img className="movie-item-image" variant="top" src={props.movie.trailerPicture}/>
            <Card.Body>
                <Card.Title>{props.movie.movieTitle}</Card.Title>
                <Stack direction="horizontal" gap={3}>
                    <Button onClick={changeModal}>Play Trailer</Button>
                    <Button onClick={handleNavigation}>Book Now</Button>
                </Stack>
            </Card.Body>
            <TrailerModal trailerVideo={props.movie.trailerVideo} movieTitle={props.movie.movieTitle} showModal={showModal} changeModal={changeModal}/>
        </Card>
    )
}

export default MovieItem