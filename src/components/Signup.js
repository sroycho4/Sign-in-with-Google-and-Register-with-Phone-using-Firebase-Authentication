import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/userAuthContext";

const Signup = () => {
  return (
    <div className="welcome-container">
      <h2>Welcome to Our Website</h2>
      <p>
      This is an example of an attractive welcome page in React.
      </p>
      <button>Get Started</button>
    </div>
  );
};

export default Signup;