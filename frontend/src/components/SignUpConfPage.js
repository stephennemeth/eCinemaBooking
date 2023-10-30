import '../css/SignUpConfPage.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function SignUpConfPage(props) {
    const [inputCode, setInputCode] = useState('')
    var actualCode = "a";
    const [ac,setAc]=useState('')
    const [verifiedStat,setVerifiedStat]=useState(false)
    const [verifyMes,setVerifyMes]=useState("Sorry incorrect code")
    const [accountId, setAccountId]=useState(99999999)
    const [codeSent,setCodeSent]=useState(false)

    const sendCode=async(e)=>{
        //get user iD
        setCodeSent(true);
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
            const accountId = userData.accountId; 
            setAccountId(accountId);
            const response2 = await fetch("http://localhost:8080/api/v1/vcode/createRegCode", {
                method: "POST",
                headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
                },
                body : JSON.stringify({
                    accountId:accountId
                })
            })
            if(response2.ok){
                const response3 = await fetch("http://localhost:8080/api/v1/vcode/getCodeById/" + accountId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            const userData = await response3.json();
            actualCode = userData.code;
            console.log("ac in thing:"+actualCode);
            console.log("ac in thing:"+userData.code);
            setAc(userData.code);
            if (response3.ok) {
                const mailResponse = await fetch(`http://localhost:8080/api/v1/mail/sendconf/${props.formData.email}?code=${actualCode}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "application/json",
            },
             });
            }
                }
        }
        
    }

    const vcheckAndCont=async(e)=>{
        e.preventDefault()
        console.log("ic:"+inputCode);
        console.log("ac:"+actualCode);
        console.log("acHook:"+ac);
        if(inputCode==ac){
            setVerifiedStat(true);
            setVerifyMes("You have been Verified!");
        }
        else{
            return;
        }
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
                 {verifiedStat ? (
                <div id="SCTopText" className="mx-auto mb-3 font-weight-bold">
                    <div id="verificationMessage">You have been Verified!</div>
                </div>
    ) : (
            <div>
                <h6 id="emailConfTxt">An email will be sent shortly to {props.formData.email} in order to verify your account.<br></br> Please enter the Code below</h6>
                <div className="row d-flex mx-auto justify-content-center align-items-center" id="vcodeContainer">
                    {/*want to swap send code for submit code */}
                    {codeSent ?(<div className="w-25 p-3 input-group mb-3" id="half-Split2-vBttn">
                        <Button id="sendCodeBtn"className="rounded-left" onClick={vcheckAndCont}> Submit Code</Button>
                    </div>):(
                    <div className="w-25 p-3 input-group mb-3" id="half-Split2-vBttn">
                        <Button id="sendCodeBtn"className="rounded-left"onClick={sendCode} >Send Code</Button>
                    </div>
                    )};

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
                    
                    </div>
                    <div className='d-flex justify-content-center'>
                        {/* <Button id="continueBtnSUC"className="mx-auto mb-3 font-weight-bold" onClick={vcheckAndCont}> Submit Code</Button> */}
                    </div>
            </div>
    
            )}
            <div className='d-flex justify-content-center'>
                <Link to='/login'>
                    <Button id="continueBtnSUC"className="mx-auto mb-3 font-weight-bold"> Continue</Button>
                </Link>
            </div>
        </body>
    );
}
export default SignUpConfPage;

