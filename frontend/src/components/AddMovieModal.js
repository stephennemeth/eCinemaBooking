import React, {useState} from 'react'
import { Modal, Form, FormControl, Button, Stack } from 'react-bootstrap'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import '../css/ManageMovie.css'

const AddMovieModal = (props) => {
    
    const [movieTitle, setMovieTitle] = useState('')
    const [category, setCategory] = useState('')
    const [cast, setCast] = useState('')
    const [director, setDirector] = useState('')
    const [producer, setProducer] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [trailerPicture, setTrailerPicture] = useState('')
    const [trailerVideo, setTrailerVideo] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [rating, setRating] = useState('')

    const addMovie = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:8080/api/v1/movie/create", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    movieTitle : movieTitle,
                    category : category,
                    cast : cast,
                    director : director,
                    producer : producer,
                    synopsis : synopsis,
                    trailerPicture : trailerPicture,
                    trailerVideo : trailerVideo,
                    releaseDate : releaseDate
                })
            })

            if (response.status === 201) {
                props.getAllMovies()
                props.setCurrentMovie(movieTitle)
                closeModal()
            }

            throw new Error("There was a problem adding the movie")

        } catch (error) {
            alert(error)
        }
    }

    const closeModal = () => {
        props.setShow(false)
        resetVals()
    }

    const resetVals = () => {
        setMovieTitle('')
        setCategory('')
        setCast('')
        setDirector('')
        setProducer('')
        setSynopsis('')
        setTrailerPicture('')
        setTrailerVideo('')
        setReleaseDate('')
    }

    return (
        <Modal size='lg' show={props.show} onHide={() => props.setShow(false)} centered>
            <Modal.Header>
                <Modal.Title>Create Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='manage-movie-column'>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Movie Title</Form.Label>
                            <FormControl className='manage-movie-column' type="text" value={movieTitle} onChange={e => setMovieTitle(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Category</Form.Label>
                            <Form.Select aria-label="Rating Selection" className='manage-movie-button' value={category} onChange={e => setCategory(e.target.value)}>
                                <option value="1">Action</option>
                                <option value="2">Comedy</option>
                                <option value="3">Drama</option>
                                <option value="4">Horror</option>
                                <option value="5">Adventure</option>
                                <option value="6">Fantasy</option>
                                <option value="7">Science-Fiction</option>
                                <option value="8">Romance</option>
                                <option value="9">Western</option>
                                <option value="10">Thriller</option>
                                <option value="11">Musical</option>
                                <option value="12">Mystery</option>
                            </Form.Select>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                            <Stack direction='horizontal' gap={2}>
                                <Form.Label className="manage-movie-input-label">Rating Code</Form.Label>
                                <Form.Select aria-label="Rating Selection" className='manage-movie-button' onChange={e => setRating(e.target.value)}>
                                    <option value="1">G</option>
                                    <option value="2">PG</option>
                                    <option value="3">PG-13</option>
                                    <option value="4">R</option>
                                    <option value="5">NC-17</option>
                                </Form.Select>
                            </Stack>
                        </Form.Group>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Cast</Form.Label>
                            <FormControl className='manage-movie-column' as="textarea" rows={3} value={cast} onChange={e => setCast(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Director(s)</Form.Label>
                            <FormControl className='manage-movie-column' type="text" value={director} onChange={e => setDirector(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Producer(s)</Form.Label>
                            <FormControl className='manage-movie-column' type="text" value={producer} onChange={e => setProducer(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Synopsis</Form.Label>
                            <FormControl className='manage-movie-column' as="textarea" rows={5} value={synopsis} onChange={e => setSynopsis(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack direction='horizontal' gap={2}>
                            <Form.Label className="manage-movie-input-label">Picure URL</Form.Label>
                            <FormControl className='manage-movie-column' type="text" value={trailerPicture} onChange={e => setTrailerPicture(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack>
                            <Form.Label className="manage-movie-input-label">Trailer URL</Form.Label>
                            <FormControl className='manage-movie-column' type="text" value={trailerVideo} onChange={e => setTrailerVideo(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack>
                            <Form.Label className="manage-movie-input-label">Release Date</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker className='manage-movie-button' onChange={(date) => setReleaseDate(date.toISOString().split('T')[0])}/>
                            </LocalizationProvider>
                        </Stack>
                    </Form.Group>
                    <Button type='submit' className='manage-movie-button' onClick={e => addMovie(e)}>Add Movie</Button>
                </Form>                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddMovieModal