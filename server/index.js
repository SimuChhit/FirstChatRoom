// Importieren der notwendigen Module
const fs = require('fs');
const https = require('https');
const express = require("express"); // Express Framework für den Server
const cors = require("cors"); // CORS-Modul für Cross-Origin-Resource-Sharing, ermöglich uns die Kommunikation zwischen Client und Server
const mongoose = require("mongoose"); // Mongoose für MongoDB Interaktionen
const path = require('path');


// Importieren des Benutzer-Routers aus einer externen Datei
const userRouter = require("./Routes/userRoute");
const chatRouter = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

// Nicht verwendete MongoDB-Client-Importe (können entfernt werden, falls nicht benötigt)
const {MongoClient, ServerApiVersion} = require('mongodb');


let basePath;
if (process.env.DOCKER_ENV) {
  // Wenn in Docker ausgeführt, verwenden Sie den Docker-spezifischen Pfad
  basePath = '/app/certs';
} else {
  // Lokaler Ausführungspfad
  basePath = path.join(__dirname, '../certs');
  // Überprüfen, ob der Pfad existiert
  if (!fs.existsSync(path.join(basePath, 'server.key'))) {
    basePath = path.join(__dirname, '../../certs');
  }
}

const privateKey = fs.readFileSync(path.join(basePath, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(basePath, 'server.cert'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Initialisieren der Express-Anwendung
const app = express();
// Einbinden von dotenv, um Umgebungsvariablen zu verarbeiten
require("dotenv").config();

const httpsServer = https.createServer(credentials, app);

// Hinzufügen von Middleware
app.use(express.json()); // Erlaubt das Parsen von JSON-Daten in Anfragen
app.use(cors()); // Aktiviert CORS, damit der Server Anfragen von anderen Domänen akzeptieren kann
app.use("/api/users", userRouter); // Leitet Anfragen an /api/users an den userRouter weiter
app.use("/api/chats", chatRouter); // Leitet Anfragen an /api/chats an den chatRouter weiter
app.use("/api/messages", messageRoute); // Leitet Anfragen an /api/messages an den messageRouter weiter

// Grundlegender Route-Handler für die Startseite
app.get("/", (req, res) => {
  res.send("Welcome to our Chat app");
});

// Definieren des Ports, auf dem der Server läuft
const port = process.env.PORT || 5000;
// URI für die MongoDB-Verbindung aus der .env-Datei
const uri = process.env.ATLAS_URI;

const PORT = 3001;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS-Server läuft auf Port ${PORT}`);
});

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected")).catch(err => console.log
("MongoDB connection failed: ", err.message))

