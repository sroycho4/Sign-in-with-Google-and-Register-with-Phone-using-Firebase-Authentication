import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/userAuthContext";
import '../App.css';
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Form, Alert } from "react-bootstrap";
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import { Link, useNavigate } from "react-router-dom";



const Home = () => {
  const { logOut, user } = useUserAuth();
  const [error, setError] = useState("");
  const [mobile, setMobile] = useState("");
const [otp, setOtp] = useState("");
const [flag, setFlag] = useState(false);
const navigate = useNavigate();
const firebaseConfig = {
  apiKey: "AIzaSyCxyifRcx8IAgOUEx162g5WA9XI1286Mq4",
  authDomain: "reactapp-b156b.firebaseapp.com",
  projectId: "reactapp-b156b",
  storageBucket: "reactapp-b156b.appspot.com",
  messagingSenderId: "684206022296",
  appId: "1:684206022296:web:e3d785daf85647e09b7aed"
};


useEffect(() => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}, [firebaseConfig]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setMobile(value);
    } else if (name === "otp") {
      setOtp(value);
     

    }
  };
 
  
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptcha verified")
      },
      defaultCountry: "IN"
    });
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha(); // Directly call the function here
    const phoneNumber = "+91" + mobile;

    console.log(phoneNumber);
    
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        setFlag(true);
      }).catch((error) => {
        console.log("SMS not sent");
      });
  }

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user));
      alert("User is verified");
      
      navigate("/signup");
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  };
  

  return (
    <>
      
     
        {error && <Alert variant="danger">{error}</Alert>}
        <Form style={{ display: !flag ? "block" : "none" }}>
        <div className="registration-form">
        <h2>Registration Form</h2>
      <div className="form-group">
          <label htmlFor="email"><b>Profile</b>     &nbsp;</label>
          <div className='photo'>
                <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer'/>
              </div>
        </div>
        <div className="form-group">
          <label htmlFor="username"><b>Name:</b>     &nbsp;{user.displayName}</label>
        </div>
        <div className="form-group">
          <label htmlFor="email"><b>Email:</b>     &nbsp;{user.email}</label>
        </div>
        <div>
         <div id="sign-in-button"></div>
         <label htmlFor="username"><b>Phone Number:</b>     &nbsp;</label>
          <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange}/>
          </div>
        <br></br>
        <div className="d-grid gap-2">
        <Button variant="primary" onClick={onSignInSubmit} >
         Save
        </Button>
      </div>
      </div>
      </Form>
      
       
        
       
        {error && <Alert variant="danger">{error}</Alert>}
        <Form style={{ display: flag ? "block" : "none" }} >
        <div className="p-4 box">
        <h2 className="mb-3">Enter OTP</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange}/>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" onClick={onSubmitOTP}>
             Send
            </Button>
          </div>
          </div>
        </Form>
     
    


    
    </>
  );
};

export default Home;