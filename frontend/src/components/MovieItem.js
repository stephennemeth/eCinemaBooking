import React, {useState} from "react"
import "../css/MovieItem.css"
import { Button, Card, Stack} from "react-bootstrap";
import TrailerModal from "./TrailerModal";

const MovieItem = (props) => {

    const [showModal, setShowModal] = useState(false)

    const changeModal = () => {
        setShowModal(!showModal)
    }

    return (

        <Card className="movie-item-card">
            <Card.Img className="movie-item-image" variant="top" src={props.movie.trailerPicture}/>
            <Card.Body>
                <Card.Title>{props.movie.movieTitle}</Card.Title>
                <Stack direction="horizontal" gap={3}>
                    <Button onClick={changeModal}>Play Trailer</Button>
                    <Button>Book Now</Button>
                </Stack>
            </Card.Body>
            <TrailerModal trailerVideo={props.movie.trailerVideo} movieTitle={props.movie.movieTitle} showModal={showModal} changeModal={changeModal}/>
        </Card>
    )
}

export default MovieItem