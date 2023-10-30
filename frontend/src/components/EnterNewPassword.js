import React, {useState, useEffect} from 'react'
import { Container, Stack, Modal } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

const EnterNewPassword = (props) => {

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [userId, setUserId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showErrorModal, setShowErrorModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const props = location.state.props
        if (props == null || props == undefined || props.userId == null || props.userId == undefined) {
            navigate('/')
        }
        setUserId(props.userId)
    })

    const updatePassword = async () => {
        if (password !== confirm) {
            setErrorMessage("Passwords must match")
            setShowErrorModal(true)
        }

        const response = await fetch(`http://localhost:8080/api/v1/user/updatePassword/${userId}`,
        {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, 
            body: JSON.stringify({
                newPassword : password
            })
        })

        if (response === 200) {
            navigate("/login")
        }

        setErrorMessage("There was an error updating your password")
        setShowErrorModal(true)
    }

    return (
        <Container>
            <Stack direction="horizontal">
                <Form.Label>Enter New Password</Form.Label>
                <FormControl type="password" onChange={e => setPassword(e.target.value)} />
            </Stack>
            <Stack direction="horizontal">
                <Form.Label>Confirm New Password</Form.Label>
                <FormControl type="password" onChange={e => setConfirm(e.target.value)} />
            </Stack>
            <Button type="button" onClick={updatePassword}>Enter</Button>
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EnterNewPassword