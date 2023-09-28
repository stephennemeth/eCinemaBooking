import React, { useState, useEffect } from "react";
import "../css/Carousel.css";
import MovieItem from "./MovieItem";
import { Container, Row, Col, Button, Stack} from "react-bootstrap";

const Slider = ({title, now, coming, search}) => {
  const [movies, setMovies] = useState([])
  const [start, setStart] = useState(0)
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
      const response = await fetch(`http://localhost:8080/api/v1/movie/getByTitle/${search}`)
      const json = await response.json()
      setMovies(json)
    } catch (error) {
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
        Loading...
      </Container>
    )
  }

  return (
    <Container className="carousel-container" fluid>
      <Row>
        <h1 className="carousel-title">{title}</h1>
      </Row>
      <Row>
        <Col style={{alignItems: 'center'}}>
          <Button className="increment-button" onClick={decreaseStart} md="auto" disabled={end < 5}>&lt;</Button>
        </Col>
        <Col md={11}>
          <Stack className="carousel" direction="horizontal" gap={2}>
            {getMovieArray().map((movie, index) => {
              return <MovieItem movie={movie} key={index}/>
            })}
          </Stack>
        </Col>
        <Col style={{alignItems: 'center'}}>
          <Button className="increment-button" onClick={increaseStart} md="auto" disabled={end < 5}>&gt;</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Slider;