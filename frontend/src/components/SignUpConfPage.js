import '../css/SignUpConfPage.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function SignUpConfPage(props) {
    const [inputCode, setInputCode] = useState('')
    const [accountId, setAccountId]=useState(99999999)

    const sendCode=async(e)=>{
        //get user iD
        e.preventDefault()
        const response = await fetch("http://localhost:8080/api/v1/user/getByEmail/"+props.formData.email,{
            method: "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
        })
        if (response.ok) {
            const userData = await response.json();
            const accountId = userData.accountId; // Assuming the response contains an accountId field
            setAccountId(accountId);
            console.log(accountId);
        }
        //create code linked to id
        const response2 = await fetch("http://localhost:8080/api/v1/vcode/createPswCode", {
            method: "POST",
            headers : {
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
            body : JSON.stringify({
                accountId:accountId
            })
        })
    }
    return( 
        <body id='sucPage'>
            <div id="SCTopText" className="mx-auto mb-3 font-weight-bold">
                <h1>Thank you for registering</h1>
            </div>
            
            <div id="confirmationBod" className="mx-auto mb-3 ">
                <h4 id="yourDetailTxt">Your details</h4>
                    <div id="confFormGenInfo">
                        <div className=''>First Name: {props.formData.firstName}</div>
                        <div id="detailText" className=''>Last Name: {props.formData.lastName}</div>
                        <div id="detailText" className=''>Email: {props.formData.email}</div>
                        <div id="detailText" className=''>Phone number: {props.formData.phoneNumber}</div>
                    </div>
                <h4 id="yourBillingAdd">Your Billing Address</h4>
                    <div id="confFormBod">
                        <div className='' id="billingText">Street Name: {props.formData.baSName}</div>
                        <div className='' id="billingText">City: {props.formData.baCity}</div>
                        <div className='' id="billingText">Zip: {props.formData.baZip}</div>
                        <div className='' id="billingText">State: {props.formData.baState}</div>
                        {/* <h6 id="emailConfTxt">An email will be sent shortly to {props.formData.email} in order to verify your account</h6> */}
                    </div>
            </div>
            <h6 id="emailConfTxt">An email will be sent shortly to {props.formData.email} in order to verify your account.<br></br> Please enter the Code below</h6>
            <div className="row d-flex mx-auto justify-content-center align-items-center" id="vcodeContainer">
                <div className="w-25 p-3 input-group mb-3" id="half-Split2-vBttn">
                    <Button id="sendCodeBtn"className="rounded-left"onClick={sendCode} >Send Code</Button>
                </div>
                <div className="w-25 p-3 input-group mb-3" id="half-Split2-vInput">
                    <input
                        className="row d-flex h-100 mx-auto"
                        id='verifyCodeInput'
                        type='text'
                        placeholder='Enter Code'
                        name='vcode'
                        onChange={e => setInputCode(e.target.value)}
                        required
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    
                <Button id="continueBtnSUC"className="mx-auto mb-3 font-weight-bold"> Continue</Button>
                   
                </div>
            </div>
        </body>
    );
}
export default SignUpConfPage;