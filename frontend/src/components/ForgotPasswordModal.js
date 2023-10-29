import React from 'react'
import { Form, FormControl, Modal } from 'react-bootstrap'

const ForgotPasswordModal = (props) => {

    const [email, setEmail] = useState('')
<<<<<<< Updated upstream
=======
    const [userId, setUserId] = useState(null)
>>>>>>> Stashed changes
    const [verificationCode, setVerificationCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [stage, setState] = useState("email")

<<<<<<< Updated upstream
    const sendPasswordEmail = async () => {
        
        const response = await fetch(`localhost:8080/api/v1/users/getByEmail/${email}`)
        if (response.status === 200)
        {

        }
    }

=======
    const checkEmail = async () => {
        const response = await fetch(`localhost:8080/api/v1/users/getByEmail/${email}`)
        if (response.status === 200) {
            const json = await response.json()
            setUserId(json.accountId)
            setState("verification")
            generateCode()
        } else {
            alert("There is not user with that email address")
        }
    }

    const generateCode = async () => {
        await fetch(`localhost:8080/api/v1/vcode/createPswCode/${accountId}`, {
            method: "POST"
        })
    }

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    </>
                }   
=======
                        <Button onClick={checkEmail}></Button>
                    </>
                }
                {stage === 'verification' &&
                    <>
                        <Form.Label>Verification Code: </Form.Label>
                        <FormControl type="password" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
                    </>
                }
                {stage === 'password' &&
                    <>
                        <Form.Label>Set New Password: </Form.Label>
                        <FormControl type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Form.Label>Confirm New Password: </Form.Label>
                        <FormControl type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
                    </>
                }
>>>>>>> Stashed changes
            </Modal.Body>
        </Modal>
    )
}