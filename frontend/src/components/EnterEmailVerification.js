import React, {useState} from 'react'
import { Button, Container, Form, FormLabel, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const EnterEmailVerification = () => {

    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState(null)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const checkEmail = async () => {
        const response = await fetch(`localhost:8080/api/v1/users/getByEmail/${email}`)
        if (response.status === 200) {
            const json = await response.json()
            setUserId(json.accountId)
            generateCode()
            navigate("/changepassword/code", state={props : {userId : userId}})
        } else {
            setErrorMessage("There are no users with that email")
            setShowErrorModal(true)
        }
    }

    return (
        <Container>
            <Stack direction="horizontal">
                <FormLabel>Enter your email</FormLabel>
                <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Stack>
            <Button type="button" onClick={checkEmail}>Enter</Button>
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

export default EnterEmailVerification