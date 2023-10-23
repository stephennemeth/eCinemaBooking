import React, { useState, useEffect } from 'react'

import '../css/NavBar.css'
import logo from '../eCinemaBooking.png'

import { Button, FormControl, Navbar, Container, Form, Nav, Image} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'


const NavBar = (props) => {

    const [query, setQuery] = useState('')

    useEffect(() => {
        console.log(props.user)
        if (localStorage.getItem("user") !== null) {
            props.setUser(localStorage.setItem("user", null))
        } else {
            props.setUser(null)
        }
    }) 
    const onSearch = () => {
        props.setSearch(query)
        setQuery('')
    }

    const logout = () => {
        localStorage.removeItem("user")
        props.setUser(null)
    }

    return (
        <Navbar bg='primary'  data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand className='navbar-brand' href='/' onClick={() => props.setSearch('')}>
                    <Image className="logo" src={logo} alt='logo' rounded/>
                </Navbar.Brand>
                <NavbarCollapse>
                    <Nav>
                        <Nav.Link className='navbar-link' href="/">Movies</Nav.Link>
                        {props.user === null &&
                            <>
                                <Nav.Link className='navbar-link' href='/login'>Login</Nav.Link>
                                <Nav.Link className='navbar-link' href='/signup'>Sign Up</Nav.Link>
                            </>
                        }
                        {props.user !== null && (
                            <>
                                <Nav.Link className='navbar-link' href="/updateprofile">Edit Profile</Nav.Link>
                                <Button className='navbar-link' onClick={logout}>Logout</Button>
                            </>
                        )}
                        
                    </Nav>
                </NavbarCollapse>
                <Form className="d-flex">
                    <FormControl type='search' placeholder='Search' size='lg' value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <Button onClick={onSearch} variant='outline-light'>Search</Button>
                </Form>
            </Container>
        </Navbar>
    )
}

export default NavBar