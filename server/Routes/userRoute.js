// Importieren des Express-Moduls, das für das Routing und die Erstellung von Servern verwendet wird
const express = require("express");

// Importieren von Funktionen aus dem 'userController'.
// Diese Funktionen definieren die Logik für verschiedene Endpunkte wie Registrierung, Login usw.
const {registerUser, loginUser, findUser, getUsers} = require("../Controllers/userController");

// Erstellen eines neuen Routers mit Express.
// Ein Router ermöglicht es, Anfragen an verschiedene Pfade (Endpunkte) zu definieren und zu verwalten.
const router = express.Router();

// Definieren der Route für das Benutzerlogin.
// Bei einer POST-Anfrage an '/login' wird die 'loginUser'-Funktion ausgeführt usw.
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;