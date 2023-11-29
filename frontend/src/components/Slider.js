import React, { useState, useEffect } from "react";
import "../css/Carousel.css";
import MovieItem from "./MovieItem";
import { Container, Row, Col, Button, Stack} from "react-bootstrap";
import MovieDetailModal from "./MovieDetailModal";

const Slider = ({title, now, coming, search, toc}) => {
  const [movies, setMovies] = useState([])
  const [start, setStart] = useState(0)
  
  const [movieTitle, setMovieTitle] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState('')
  const [producer, setProducer] = useState('')
  const [director, setDirector] = useState('')
  const [cast, setCast] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [show, setShow] = useState(false)


  const end = movies.length < 5 ? movies.length : 5

  useEffect(() => {
    if (search) {
      getMovies()
    } else if (now) {
      getNow()
    } else if (coming) {
      getComingSoon()
    } else {
      getAllMovies()
    }
  }, [search])

  const getMovies = async () => {
    try {
      const response = toc ? await fetch(`http://localhost:8080/api/v1/movie/getByTitle/${search}`) : await fetch(`http://localhost:8080/api/v1/movie/category/${search}`)
      const movies = await response.json()
      setMovies(movies)
    } catch (error) {
      setMovies([])
      console.log(error)
    }
  }

  const getComingSoon = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/movie/getComingSoon`)
      const json = await response.json()
      setMovies(json)
    } catch (error) {
      console.log(error)
    }
  }

  const getNow = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/movie/getNowPlaying`)
      const json = await response.json()
      setMovies(json)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/movie/getAllMovies")
      const json = await response.json()
      setMovies(json)
    } catch (error) {
      console.log(error)
    }
  }

  const increaseStart = () => {
    const newStart = (start + 1) === movies.length ? 0 : (start + 1)
    setStart(newStart)
  }

  const decreaseStart = () => {
    const newStart = (start - 1) < 0 ? movies.length - 1 : (start - 1)
    setStart(newStart)
  }

  const getMovieArray = () => {
    let movieArray = new Array(end)

    for (let i = 0; i < end; i++) {
      const index = (start + i) % movies.length
      movieArray[i] = movies[index]
    }

    return movieArray
  }

  if (movies.length === 0) {
    return (
      <Container className="carousel-container" fluid>
        No Movies yet
      </Container>
    )
  }

  const showMovieDetailModal = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/v1/movie/getMovie/${movieId}`)

    const movie = await response.json()
    setMovieTitle(movie.movieTitle)
    setCast(movie.cast)
    setImage(movie.trailerPicture)
    setCategory(movie.category)
    setRating(movie.rating)
    setDirector(movie.director)
    setProducer(movie.producer)
    setSynopsis(movie.synopsis)
    setShow(true)
  }

  return (
    <>
    <Container className="carousel-container" fluid>
      <Row>
        <h1 className="carousel-title">{title}</h1>
      </Row>
      <Row>
        <Col style={{alignItems: 'center'}}>
          <Button className="increment-button" onClick={increaseStart} md="auto" disabled={end < 5}>&lt;</Button>
        </Col>
        <Col md={11}>
          <Stack className="carousel" direction="horizontal" gap={2}>
            {getMovieArray().map((movie, index) => {
              return (
                <MovieItem movie={movie} key={index} onClick={() => showMovieDetailModal(movie[1])}/>
              )
            })}
          </Stack>
        </Col>
        <Col style={{alignItems: 'center'}}>
          <Button className="increment-button" onClick={decreaseStart} md="auto" disabled={end < 5}>&gt;</Button>
        </Col>
      </Row>
    </Container>
    <MovieDetailModal show={show} title={movieTitle} image={image} category={category} rating={rating} producer={producer} director={director} cast={cast} synopsis={synopsis} setShow={setShow}/>
    </>
  );
};

export default Slider;