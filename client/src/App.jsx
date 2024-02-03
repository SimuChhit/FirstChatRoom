import {Routes, Route, Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";



function App() {
  const {user} = useContext(AuthContext);
    return (
        <>
          <div className="Test">
            <NavBar/>
            <Container className="container-app">
                <Routes>
                    <Route path="/" element={user ? <Chat/>: <Login/>}/>
                    <Route path="/register" element={user ? <Chat/>: <Register/>}/>
                    <Route path="/login" element={user ? <Chat/>: <Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Container>
            </div>
        </>
    );
}

export default App;
