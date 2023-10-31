import React, {useState, useEffect} from 'react'
import { Container, Form, Stack, Modal, FormControl, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const EnterVerificationCode = (props) => {

    const [code, setCode] = useState('')
    const [userId, setUserId] = useState('')
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const state = location.state
        if (state === null || state.props === null || state.props.userId === null) {
            navigate("/")
        } else {
            setUserId(state.props.userId)
        }
    })

    const verifyCode = async () => {

        const response = await fetch("http://localhost:8080/api/v1/vcode/verifypasswordcode", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                code : code,
                accountId : userId,
                codeType : 0
            })
        })

        if (response.status === 200) {
            console.log(userId)
            navigate("/changepassword/password", {state:{ props : {userId : userId}}})
        }

        setErrorMessage("The code is not valid for your account")
        setShowErrorModal(true)
    }

    return (
        <Container>
            <Stack direction="horizontal">
                <Form.Label>Verification Code:</Form.Label>
                <FormControl type="password" placeholder="Code" onChange={e => setCode(e.target.value)} />
            </Stack>
            <Button type="button" onClick={verifyCode}>Verify</Button>
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

export default EnterVerificationCode