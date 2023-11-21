import React, {useState, useEffect} from 'react'
import { Modal, Form, FormControl, Button, Stack } from 'react-bootstrap'

const MovieDetailProxyModal = (props) => {

    const [movie, setMovie] = useState(null)

    useEffect(() => {
        if (movie == null || movie.id != props.id) {
            
        }
    })
    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>
                    {props.movieTitle}
                </Modal.Title>
            </Modal.Header>
        </Modal>
    )
}

export default MovieDetailProxyModal