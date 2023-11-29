import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import "../css/MovieItem.css";
import { Button, Card, Stack} from "react-bootstrap";
import TrailerModal from "./TrailerModal";

const MovieItem = (props) => {

    const [showModal, setShowModal] = useState(false)
    const [trailerVideo, setTrailerVideo] = useState('')

    const changeModal = () => {

        setShowModal(!showModal)
        const getTrailerVideo = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/movie/trailer/${props.movie[1]}`)
            
            const trailer = await response.text()
            
            setTrailerVideo(trailer)
            return
        }

        getTrailerVideo()
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
            <Card.Img className="movie-item-image" variant="top" src={props.movie[0]}/>
            <Card.Body>
                <Card.Title>{props.movie[2]}</Card.Title>
                <Stack direction="horizontal" gap={3}>
                    <Button onClick={changeModal}>Play Trailer</Button>
                    <Button onClick={handleNavigation}>Book Now</Button>
                </Stack>
            </Card.Body>
            <TrailerModal movieTitle={props.movie[2]} showModal={showModal} changeModal={changeModal} movieId={props.movie[1]} trailerVideo={trailerVideo}/>
        </Card>
    )
}

export default MovieItem