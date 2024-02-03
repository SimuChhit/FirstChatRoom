import react from "react";
import './pageStyles/login.css';
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import {Form} from "react-bootstrap";


const Login = () => {
  return <>
    <Form>
      <div className="wrapper">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required/>
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required/>
          <FaLock className="icon"/>
        </div>
        <div className="login-box">
          <button type="submit">Login</button>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </Form>
  </>
    ;
};

export default Login;