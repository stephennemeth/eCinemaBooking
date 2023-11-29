import React from 'react'

import Modal from 'react-bootstrap/Modal';
import { ModalHeader, ModalBody, Button} from "react-bootstrap";

import '../css/TrailerModal.css'

const TrailerModal = (props) => {


    return (
        <Modal className="trailer-modal" size="xl" show={props.showModal} onHide={props.changeModal} centered>
            <ModalHeader closeButton>
                <Modal.Title>{props.movieTitle} Trailer</Modal.Title>
            </ModalHeader>
            <ModalBody className='modal-body'>
                <iframe
                    src={props.trailerVideo} title="movie-title" width="100%" height="100%" allowFullScreen>
                </iframe>
            </ModalBody>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.changeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
} 

export default TrailerModal