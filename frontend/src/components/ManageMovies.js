import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Dropdown, DropdownButton, Image, Stack, Button, Form, FormControl} from 'react-bootstrap'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';


import '../css/ManageMovie.css'
import AddMovieModal from './AddMovieModal';
import { useNavigate } from 'react-router-dom';

const ManageMovies = () => {
    
    const [movies, setMovies] = useState([])
    const [currentMovie, setCurrentMovie] = useState(false)
    const [show, setShow] = useState(false)
    const [showTimes, setShowTimes] = useState([])
    const navigate = useNavigate()
    

    const [movieId, setMovieId] = useState('')
    const [movieTitle, setMovieTitle] = useState('')
    const [trailerPicture, setTrailerPicture] = useState('')
    const [trailerVideo, setTrailerVideo] = useState('')
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState('')
    const [cast, setCast] = useState('')
    const [producer, setProducer] = useState('')
    const [director, setDirector] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [releaseDate, setReleaseDate] = useState(null)
    const [durationMinutes, setDurationMinutes] = useState(0)
    const [durationHours, setDurationHours] = useState(0)
    const [playing, setPlaying] = useState(1)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user === null || user.userTypeId !== 1) {
            navigate('/')
        }

        getAllMovies()
    }, [])

    const getAllMovies = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/v1/movie/getAllMovies")
          const json = await response.json()
          setMovies(json)
        } catch (error) {
          console.log(error)
        }
    }

    const getShowTimesByMovie = async (currentMovieId) => {
        const response = await fetch(`http://localhost:8080/api/v1/showTime/findByMovieId/${currentMovieId}`)

        const json = await response.json()

        setShowTimes(json)
    }

    const updateMovie = async (e) => {
        e.preventDefault()

        let ratingId = 0

        if (rating === "G") {
            ratingId = 1
        } else if (rating === "PG") {
            ratingId = 2
        } else if (rating === "PG-13") {
            ratingId = 3
        } else if (rating === "R") {
            ratingId = 4
        } else {
            ratingId = 5
        }

        try {
            await fetch("http://localhost:8080/api/v1/movie/update", {
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                method : "POST",
                body : JSON.stringify({
                    movieId : movieId,
                    movieTitle : movieTitle,
                    category : genre,
                    producer : producer,
                    director : director,
                    cast : cast,
                    synopsis : synopsis,
                    trailerPicture : trailerPicture,
                    trailerVideo : trailerVideo,
                    durationHours: durationHours,
                    durationMinutes : durationMinutes,
                    ratingId : ratingId,
                    releaseDate : releaseDate,
                    playing : playing
                })
            })
            
            await getAllMovies()
        } catch (error) {
            console.log(error)
        }
    }

    const setMovieValues = async (movie) => {
                setMovieId(movie.movieId)
                setMovieTitle(movie.movieTitle)
                setTrailerPicture(movie.trailerPicture)
                setTrailerVideo(movie.trailerVideo)
                setGenre(movie.category)
                setProducer(movie.producer)
                setDirector(movie.director)
                setCast(movie.cast)
                setSynopsis(movie.synopsis)
                setDurationMinutes(movie.durationMinutes)
                setDurationHours(movie.durationHours)
                setReleaseDate(dayjs(movie.releaseDate))
                setRating(movie.usRatingCode)
                setCurrentMovie(true)
                setPlaying(movie.playing)
    }

    const handleSelect = async (movieTitle) => {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].movieId=== movieTitle) {
                await setMovieValues(movies[i])
                await getShowTimesByMovie(movies[i].movieId)
                console.log(showTimes.length)
                return
            }
        }
    }

    if (movies.length === 0) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return  (
            <Container className='manage-movie-container'fluid>
                <Row>
                    <Col className='manage-movie-column'> 
                        <Stack direction='horizontal' gap={2} />
                            <DropdownButton title="Select A Movie" className='manage-movie-button'>
                                {movies.map((movie, index) => {
                                    return <Dropdown.Item key={index} onClick={() => handleSelect(movie.movieId)}>{movie.movieTitle}</Dropdown.Item>
                                })}
                            </DropdownButton>
                            <Button className='manage-movie-button' onClick={e => setShow(true)}>Add Movie</Button>
                        <Stack />
                        {currentMovie && 
                            <>
                                <Image className="manage-movie-button" src={trailerPicture}/>
                                <Stack direction='horizontal' gap={2}>
                                    <Button className='manage-movie-button'>Archive Movie</Button>
                                    <Button className='manage-movie-button'>Delete Movie</Button>
                                </Stack>
                            </>
                        }
                    </Col>
                    <Col className='manage-movie-column'>
                        {currentMovie &&    
                            <Form className='manage-movie-column'>
                                <Form.Label><h4>Edit Details</h4></Form.Label>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Movie Title</Form.Label>
                                        <FormControl className='manage-movie-column' type="text" value={movieTitle} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Category</Form.Label>
                                        <Form.Select aria-label="Genre Selection" className='manage-movie-button' value={genre} onChange={e => setGenre(e.target.value)}>
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
                                        <Form.Control aria-label="Rating Selection" className='manage-movie-button' value={rating} onChange={(e => setRating(e.target.value))}>
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
                                    <Stack direction="horizontal" gap={2}>
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
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Trailer URL</Form.Label>
                                        <FormControl className='manage-movie-column' type="text" value={trailerVideo} onChange={e => setTrailerVideo(e.target.value)}/>
                                    </Stack>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Release Date</Form.Label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker className='manage-movie-button manage-movie-date-picker' value={releaseDate} onChange={date => setReleaseDate(date.toISOString().split('T')[0])}/>
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
                                <Button type='button' className='manage-movie-button' onClick={updateMovie}>Save Changes</Button>
                            </Form>
                        }
                    </Col>
                    <Col className='manage-movie-column'>
                        {currentMovie && 
                            <>
                                <Form className='manage-movie-column'>
                                    <Form.Label><h4>Manage Showtimes</h4></Form.Label>
                                    <Stack>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker label="Show Date" />
                                            <TimePicker label="Show Time" />
                                        </LocalizationProvider>
                                    </Stack>
                                    <Stack className='manage-movie-column'>
                                        <Form.Select aria-label="Theater Selection" className='manage-movie-button'>
                                            <option>Theater</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </Form.Select>
                                        <Button className='manage-movie-button'>Add Show Time</Button>
                                    </Stack>
                                </Form>
                                <Container className='manage-movie-column'>
                                    <h4>Current Show Times</h4>
                                    <Stack className='manage-movie-column'>
                                        {showTimes.map((showTime) => {
                                            return (
                                                <Row key={showTime.showTimeId}>
                                                    <p>Theater {showTime.showRoomId} {showTime.showDate} {showTime.startTime}</p>
                                                </Row>
                                            )
                                        })}
                                    </Stack>
                                </Container>
                            </>
                        }
                    </Col>
                </Row>
                <AddMovieModal show={show} setShow={setShow} getAllMovies={getAllMovies} setCurrentMovie={setCurrentMovie}/>
            </Container>
        )
    }
}

export default ManageMovies