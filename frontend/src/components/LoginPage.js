import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import Stack from 'react-bootstrap/Stack';
import { FormControl, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
  
function LoginPage(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [code, setCode] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [userId, setUserId] = useState(null)

  const navigate = useNavigate()

  const login = async (e) => {

    e.preventDefault()
    const response = await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify({
        email : username,
        password : password
      })
    })

    if (response.status == 200) {
      const json = await response.json()
      if (json.userStatusId !== 1) {
        setUserId(json.accountId)
        sendCode(json)
        setErrorMessage(`Your account must be verified in order to login. An email was sent to ${json.email} with a verification code`)
        setShowVerificationModal(true)
        return
      }
      localStorage.setItem("user", JSON.stringify(json))
      props.setUser(JSON.parse(localStorage.getItem("user")))
      navigate("/")
    } else if (response.status == 404) {
      setErrorMessage("There are no users with that email address. Please create an account before trying again.");
      setShowErrorModal(true);
    } else if (response.status == 401) {
      setErrorMessage("Incorrect password for that username");
      setShowErrorModal(true);
    }
  }

  const sendCode = async (account) => {
    const createResponse = await fetch("http://localhost:8080/api/v1/vcode/createRegCode", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify({
        accountId: account.accountId
      })
    })

    if (createResponse.ok) {
      const codeBody = await createResponse.json();
      setCode(codeBody.code)
      const mailResponse = await fetch(`http://localhost:8080/api/v1/mail/sendconf/${account.email}?code=${codeBody.code}`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json",
        },
      });
    }
  }

  const verifyCode = async () => {
    if (code === inputCode) {
      const response = await fetch("http://localhost:8080/api/v1/user/updateUserStatusId/"+userId, {
        method: "POST",
        headers : {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: 1
      })
      alert("You have been Verified! Try Logging in")
      setShowVerificationModal(false)
    } else {
      alert("Verification Code does not match that sent to you")
    }
  }
  return (
    <div id="loginbody">

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

      <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Please verify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage}
          <Stack direction='horizontal'>
            <Button type="button" onClick={verifyCode}>Submit Code</Button>
            <FormControl placeholder="1234" value={inputCode} onChange={e => setInputCode(e.target.value)}/>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <form id="loginform" className='input-group mb-3 mx-auto'>
        <div className='w-25 font-weight-bold input-group mb-3 mx-auto' id="logintxt">
          Login
        </div>
        <input
          id='logininput'
          type='text'
          placeholder='Username'
          name='uname'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          id='logininput'
          type='password'
          placeholder='Password'
          name='psw'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button id='loginbtn' type="submit" onClick={e => login(e)}>Log In</button>

        <div className="row d-flex h-100 mx-auto" id="buttonContainer">
          <Stack direction="horizontal" gap={1}>
          <div className="col-6" id="half-Splitlogin">
              <Link to='/signup'>
                Dont have an Account?
              </Link>
            </div>

            <div className="col-6" id="half-Splitlogin">
              <Link to='/changepassword/email'>
                Forgot Password?
              </Link>
            </div>
          </Stack>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
