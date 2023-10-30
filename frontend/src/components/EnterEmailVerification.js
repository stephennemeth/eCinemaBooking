import React, {useState} from 'react'
import { Button, Container, Form, FormLabel, Stack, Modal} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const EnterEmailVerification = () => {

    const [email, setEmail] = useState('')
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const checkEmail = async () => {
        const response = await fetch(`http://localhost:8080/api/v1/user/getByEmail/${email}`)
        if (response.status === 200) {
            const json = await response.json()
            const result = generateCode(json.accountId)
            if (result) {
                navigate("/changepassword/code", {state : {props : {userId : json.accountId}}})
            }
        } else {
            setErrorMessage("There are no users with that email")
            setShowErrorModal(true)
        }
    }

    const generateCode = async (userId) => {
        const response = await fetch(`http://localhost:8080/api/v1/vcode/createPswCode/${userId}/${email}`, {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify({
                email : email
            })
        })

        if (response.status === 201) {
            return
        }

        setErrorMessage("There is a problem generating and sending your codes")
        setShowErrorModal(true)
        return false
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