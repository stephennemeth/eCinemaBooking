import '../css/SignUpConfPage.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function SignUpConfPage(props) {
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
                        <div className='' id="billingText">City: {props.formData.baSCity}</div>
                        <div className='' id="billingText">Zip: {props.formData.baZip}</div>
                        <div className='' id="billingText">State: {props.formData.baState}</div>
                        {/* <h6 id="emailConfTxt">An email will be sent shortly to {props.formData.email} in order to verify your account</h6> */}
                    </div>
            </div>
            <h6 id="emailConfTxt">An email will be sent shortly to {props.formData.email} in order to verify your account</h6>
            <div className='d-flex justify-content-center'>
            <Link to='/'>
                <Button id="continueBtnSUC"className="mx-auto mb-3 font-weight-bold" > Continue</Button>
            </Link>
            </div>
        </body>
    );
}
export default SignUpConfPage;