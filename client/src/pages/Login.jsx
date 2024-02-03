import {useContext} from "react";
import './pageStyles/login.css';
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import {Alert, Button, Form} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext.jsx";


const Login = () => {

  const {loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading} = useContext(AuthContext);

  return <>
    <Form onSubmit={loginUser}>
      <div className="wrapper">
        <h1>Login</h1>
        <div className="input-box">
          <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo
          ({...loginInfo, email:e.target.value})}/>
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo
          ({...loginInfo, password:e.target.value})}/>
          <FaLock className="icon"/>
        </div>
        <div className="login-box">
          <Button className="login-button" variant="primary" type="submit">
            {isLoginLoading ? "Login in..." : "Login"}
          </Button>
          <p>Don't have an account? <a href="/register">Register</a></p>
          {loginError?.error && <Alert variant="danger" className="errorMessage"><p>{loginError?.message}</p></Alert>}
          </div>
      </div>
    </Form>
  </>
    ;
};

export default Login;