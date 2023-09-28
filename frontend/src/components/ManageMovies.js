import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Dropdown, DropdownButton, Image, Stack, Button, Form, FormControl} from 'react-bootstrap'
import { DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import '../css/ManageMovie.css'
import AddMovieModal from './AddMovieModal';


const ManageMovies = () => {
    
    const [movies, setMovies] = useState([])
    const [currentMovie, setCurrentMovie] = useState(null)
    const [newShowingDate, setNewShowingDate] = useState(null)
    const [show, setShow] = useState(false)

    const getAllMovies = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/v1/movie/getAllMovies")
          const json = await response.json()
          setMovies(json)
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        getAllMovies()
    }, [currentMovie])

    const handleSelect = (movieTitle) => {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].movieTitle === movieTitle) {
                setCurrentMovie(movies[i])
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
                        <DropdownButton id="dropdown-basic-button" title="Select A Movie" className='manage-movie-button'>
                            {movies.map((movie, index) => {
                                return <Dropdown.Item key={index} onClick={() => handleSelect(movie.movieTitle)}>{movie.movieTitle}</Dropdown.Item>
                            })}
                            <Dropdown.Item onClick={() => setShow(true)}>Add Movie</Dropdown.Item>
                        </DropdownButton>
                        {currentMovie && 
                            <>
                                <Image className="manage-movie-button" src={currentMovie.trailerPicture}/>
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
                                        <FormControl className='manage-movie-column' type="text" value={currentMovie.movieTitle} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Category</Form.Label>
                                        <Form.Select aria-label="Rating Selection" className='manage-movie-button' value={currentMovie}>
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
                                        <Form.Select aria-label="Rating Selection" className='manage-movie-button'>
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
                                        <FormControl className='manage-movie-column' as="textarea" rows={3} value={currentMovie.cast} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction="horizontal" gap={2}>
                                        <Form.Label className="manage-movie-input-label">Director(s)</Form.Label>
                                        <FormControl className='manage-movie-column' type="text" value={currentMovie.director} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Producer(s)</Form.Label>
                                        <FormControl className='manage-movie-column' type="text" value={currentMovie.producer} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Synopsis</Form.Label>
                                        <FormControl className='manage-movie-column' as="textarea" rows={5} value={currentMovie.synopsis} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Picure URL</Form.Label>
                                        <FormControl className='manage-movie-column' type="text" value={currentMovie.trailerPicture} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Trailer URL</Form.Label>
                                        <FormControl className='manage-movie-column' type="text" value={currentMovie.trailerVideo} />
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Stack direction='horizontal' gap={2}>
                                        <Form.Label className="manage-movie-input-label">Release Date</Form.Label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker className='manage-movie-button manage-movie-date-picker' value={new Date(currentMovie.relaseDate)} onChange={date => console.log(date.toISOString().split('T')[0])}/>
                                        </LocalizationProvider>
                                    </Stack>
                                </Form.Group>
                                <Button type='submit' className='manage-movie-button'>Save Changes</Button>
                            </Form>
                        }
                    </Col>
                    <Col className='manage-movie-column'>
                        {currentMovie && 
                            <>
                                <Form className='manage-movie-column'>
                                    <Form.Label><h4>Manage Showtimes</h4></Form.Label>
                                    <Stack className='manage-movie-column'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker className='manage-movie-button' onChange={date => console.log(date.toISOString().replace('T', ' ').split('.')[0])}/>
                                        </LocalizationProvider>
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
                                        <Row>
                                            <Stack className='manage-movie-button' direction='horizontal' gap={4}>
                                                8/9/2023 12:00 pm Theater 2
                                                <Button className='manage-movie-button'>Delete Show Time</Button>
                                            </Stack>
                                        </Row>
                                        <Row>
                                            <Stack className='manage-movie-button' direction='horizontal' gap={4}>
                                                8/9/2023 12:00 pm Theater 2
                                                <Button className='manage-movie-button' >Delete Show Time</Button>
                                            </Stack>
                                        </Row>
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