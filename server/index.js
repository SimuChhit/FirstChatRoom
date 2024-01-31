// Importieren der notwendigen Module
const express = require("express"); // Express Framework für den Server
const cors = require("cors"); // CORS-Modul für Cross-Origin-Resource-Sharing, ermöglich uns die Kommunikation zwischen Client und Server
const mongoose = require("mongoose"); // Mongoose für MongoDB Interaktionen

// Importieren des Benutzer-Routers aus einer externen Datei
const userRouter = require("./Routes/userRoute");

// Nicht verwendete MongoDB-Client-Importe (können entfernt werden, falls nicht benötigt)
const {MongoClient, ServerApiVersion} = require('mongodb');

// Initialisieren der Express-Anwendung
const app = express();
// Einbinden von dotenv, um Umgebungsvariablen zu verarbeiten
require("dotenv").config();

// Hinzufügen von Middleware
app.use(express.json()); // Erlaubt das Parsen von JSON-Daten in Anfragen
app.use(cors()); // Aktiviert CORS, damit der Server Anfragen von anderen Domänen akzeptieren kann
app.use("/api/users", userRouter); // Leitet Anfragen an /api/users an den userRouter weiter

// Grundlegender Route-Handler für die Startseite
app.get("/", (req, res) => {
    res.send("Welcome to our Chat app");
});

// Definieren des Ports, auf dem der Server läuft
const port = process.env.PORT || 5000;
// URI für die MongoDB-Verbindung aus der .env-Datei
const uri = process.env.ATLAS_URI;

// Starten des Express-Servers
app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
});

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected")).catch(err => console.log
("MongoDB connection failed: ", err.message))
