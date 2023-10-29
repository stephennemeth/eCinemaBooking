import React from 'react'
import { Form, FormControl, Modal } from 'react-bootstrap'

const ForgotPasswordModal = (props) => {

    const [email, setEmail] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [stage, setState] = useState("email")

    const sendPasswordEmail = async () => {
        
        const response = await fetch(`localhost:8080/api/v1/users/getByEmail/${email}`)
        if (response.status === 200)
        {

        }
    }

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {stage === "email" &&
                    <>
                        <Form.Label>Email: </Form.Label>
                        <FormControl type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </>
                }   
            </Modal.Body>
        </Modal>
    )
}