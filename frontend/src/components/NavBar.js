import React, { useState } from 'react'

import '../css/NavBar.css'
import logo from '../eCinemaBooking.png'

import { Button, FormControl, Navbar, Container, Form, Nav, Image } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'


const NavBar = (props) => {

    const [query, setQuery] = useState('')

    const onSearch = () => {
        props.setSearch(query)
        setQuery('')
    }

    

    return (
        <Navbar bg='primary'  data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand className='navbar-brand' href='/' onClick={() => props.setSearch('')}>
                    <Image className="logo" src={logo} alt='logo' rounded/>
                </Navbar.Brand>
                <NavbarCollapse>
                    <Nav>
                        <Nav.Link className='navbar-link' href='/login'>Login</Nav.Link>
                        <Nav.Link className='navbar-link' href='/signup'>Sign Up</Nav.Link>
                        <Nav.Link className='navbar-link' href="/">Movies</Nav.Link>
                        <Nav.Link className='navbar-link' href="/admin">Admin</Nav.Link>
                        <Nav.Link className='navbar-link' href="/updateprofile">Edit Profile</Nav.Link>
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