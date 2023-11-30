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
    const [releaseDate, setReleaseDate] = useState(null)
    const [durationMinutes, setDurationMinutes] = useState(0)
    const [durationHours, setDurationHours] = useState(0)
    const [rating, setRating] = useState('')

    const checkVals = () => {
        if (movieTitle === '' || category === '' || cast === '' || director === '' || producer === '' || synopsis === '' || trailerPicture === '' || trailerVideo === '') {
            alert("All fields are required")
            return false
        } 

        if (durationHours === 0 && durationMinutes === 0) {
            alert("Movie cannot have 0 duration time")
            return false
        }

        if (releaseDate === null) {
            alert("Movie needs a release date")
            return false
        }

        return true
    }
    const addMovie = async (e) => {
        e.preventDefault()

        if (!checkVals()) {
            return
        }
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
                    releaseDate : releaseDate,
                    durationHours : durationHours,
                    durationMinutes : durationMinutes,
                    rating: rating
                })
            })

            if (response.status === 201) {
                props.getAllMovies()
                props.setCurrentMovie(false)
                closeModal()
                alert("Movie added successfully")
                return
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
        setDurationHours(0)
        setDurationMinutes(0)
        setRating('')
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
                            <Form.Control className='manage-movie-button' value={category} onChange={e => setCategory(e.target.value)}>
                            </Form.Control>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                            <Stack direction='horizontal' gap={2}>
                                <Form.Label className="manage-movie-input-label">Rating</Form.Label>
                                <Form.Control className='manage-movie-button' onChange={e => setRating(e.target.value)}>
                                </Form.Control>
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
                                <DatePicker className='manage-movie-button' onChange={date => setReleaseDate(date.toISOString().split('T')[0])}/>
                            </LocalizationProvider>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Stack direction="horizontal">
                            <Form.Label className="manage-movie-input-label">Duration: Hours</Form.Label>
                            <FormControl className="manage-movie-column" type="text" value={durationHours} onChange={e => setDurationHours(e.target.value)}/>
                        </Stack>
                    </Form.Group>
                        <Form.Group>
                            <Stack direction="horizontal">
                                <Form.Label className="manage-movie-input-label">Duration: Minutes</Form.Label>
                                <FormControl className="manage-movie-column" type="text" value={durationMinutes} onChange={e => setDurationMinutes(e.target.value)}/>
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