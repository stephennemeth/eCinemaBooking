import React from 'react'
import { Modal } from 'react-bootstrap'
import { Col, Row, Container, Dropdown, DropdownButton, Image, Stack, Button, Form, FormControl} from 'react-bootstrap'


const MovieDetailModal = (props) => {

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Image src={props.image}></Image>
                </Col>
                <Col>
                    <Row>
                        <Stack gap={3} direction='horizontal'>
                            <Form.Label>Category:</Form.Label>
                            <Form.Label>{props.category}</Form.Label>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack gap={3} direction='horizontal'>
                            <Form.Label>Rating:</Form.Label>
                            <Form.Label>{props.rating}</Form.Label>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack gap={3} direction='horizontal'>
                            <Form.Label>Producer:</Form.Label>
                            <Form.Label>{props.producer}</Form.Label>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack gap={3} direction='horizontal'>
                            <Form.Label>Director:</Form.Label>
                            <Form.Label>{props.director}</Form.Label>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack gap={3} direction='horizontal'>
                            <Form.Label>Cast:</Form.Label>
                            <Form.Label>{props.cast}</Form.Label>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack gap={3} direction='horizontal'>
                            <Form.Label>Synopsis:</Form.Label>
                            <Form.Label>{props.synopsis}</Form.Label>
                        </Stack>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default MovieDetailModal