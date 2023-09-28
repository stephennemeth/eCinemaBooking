import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginPage.css';
 
function LoginPage() {
  return (
    <body id="loginbody">
      <form id="loginform" className='input-group mb-3 mx-auto'>
        <div className='w-25 font-weight-bold input-group mb-3 mx-auto' id="logintxt">
          Login
        </div>
        <input
          id='logininput'
          type='text'
          placeholder='Username'
          name='uname'
          required
        />
        <input
          id='logininput'
          type='password'
          placeholder='Password'
          name='psw'
          required
        />
        <button id='loginbtn' type="submit">Log In</button>

        <div className="row d-flex h-100 mx-auto" id="buttonContainer">
          <div className="col-5" id="half-Split-login">
            <Link to='/'>
              <button id='loginsplitbtn-l' type="submit">Forgot <br />Password?</button>
            </Link>
          </div>

          <div className="col-6" id="half-Splitlogin">
            <Link to='/'>
              <button id='loginsplitbtn-r' type="submit">Don't have an <br />Account?</button>
            </Link>
          </div>
        </div>
      </form>
    </body>
  );
}

export default LoginPage;
