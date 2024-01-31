import {Routes, Route, Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";

function App() {
    return (
        <>
          <div className="app-container">
            <NavBar/>
            <Container className="container-app">
                <Routes>
                    <Route path="/" element={<Chat/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Container>
            </div>
        </>
    );
}

export default App;
