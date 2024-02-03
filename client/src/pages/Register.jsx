import {useContext} from "react";
import {Alert, Button, Form, Row, Col, Stack} from "react-bootstrap";
import './pageStyles/Register.css';
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import {FaEnvelope} from "react-icons/fa";
import {AuthContext} from "../context/AuthContext.jsx";


const Register = () => {

  const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);

  return <>
    <Form onSubmit={registerUser}>
      <div className="wrapper">
        <h1>Register</h1>
        <div className="input-box">
          <Form.Control type="text" placeholder="name" onChange={(e) => updateRegisterInfo
          ({...registerInfo, name: e.target.value})}/>
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo
          ({...registerInfo, email: e.target.value})}/>
          <FaEnvelope className="icon"/>
        </div>
        <div className="input-box">
          <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo
          ({...registerInfo, password: e.target.value})}/>
          <FaLock className="icon"/>
        </div>
        <div className="button-box">
          <Button className="register-button" variant="primary" type="submit">
            {isRegisterLoading ? "Creating your account" : "Register"}
          </Button>
          {registerError?.error && <Alert variant="danger"><p>{registerError?.message}</p></Alert>}
        </div>
      </div>
    </Form>
  </>
};

export default Register;
