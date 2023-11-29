import React, { useState, useEffect } from 'react'

import '../css/NavBar.css'
import logo from '../eCinemaBooking.png'

import { Button, FormControl, Navbar, Container, Form, Nav, Image, Stack} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'


const NavBar = (props) => {

    const [query, setQuery] = useState('')

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (props.user === null) {
            if (localStorage.getItem("user") !== null) {
                props.setUser(JSON.parse(localStorage.getItem("user")))
            }
        }
    })

    const onSearch = (toc) => {
        props.setSearch(query)
        props.setToc(toc)
        setQuery('')
    }

    const logout = () => {
        localStorage.removeItem("user")
        props.setUser(null)
        navigate("/")
        setShowLogoutModal(true); 
    }

    return (
        <>
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
                                {props.user.userTypeId === 1 && <Nav.Link className='navbar-link' href="/admin">Admin</Nav.Link>}
                            </>
                        )}
                        
                    </Nav>
                </NavbarCollapse>
                <Form className="d-flex">
                    <Stack gap={2}>
                        <FormControl type='search' placeholder='Search' size='lg' value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <Stack direction="horizontal" gap={2}>
                            <Button onClick={() => onSearch(true)} variant='outline-light'>Search Title</Button>
                            <Button onClick={() => onSearch(false)} variant='outline-light'>Search Category</Button>
                        </Stack>
                    </Stack>
                </Form>
            </Container>
        </Navbar>

        <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
<Modal.Header closeButton>
    <Modal.Title>Success</Modal.Title>
</Modal.Header>
<Modal.Body>You have successfully logged out!</Modal.Body>
<Modal.Footer>
    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
        Close
    </Button>
</Modal.Footer>
</Modal>
</>

    )
}

export default NavBar