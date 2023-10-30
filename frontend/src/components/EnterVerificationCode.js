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

        const props = location.state.props;
        
        if (props == null || props == undefined || props.userId == null || props.userId == undefined) {
            navigate("/")
        }

        setUserId(props.userId)
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
                codeType : 1
            })
        })

        if (response.status === 200) {
            navigate("/changepassword/password", {state:{props : {userId : userId}}})
        }

        setErrorMessage("The code is not valid for your account")
        setShowErrorModal(true)
    }

    return (
        <Container>
            <Stack direction="horizontal">
                <Form.Label>Verificatoin Code:</Form.Label>
                <FormControl type="text" onChange={e => setCode(e.target.value)} />
            </Stack>
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