const fs = require('fs');
const https = require('https');
const path = require('path');
const { Server } = require("socket.io");

// Lese SSL-Zertifikat und Schlüssel
const privateKey = fs.readFileSync(path.join(__dirname, '..', 'server', 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '..', 'server', 'server.cert'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Erstelle einen HTTPS-Server (ohne Express, da dies nur für Socket.IO ist)
const httpsServer = https.createServer(credentials);

// Erstelle einen neuen Socket.IO-Server und binde ihn an den HTTPS-Server
const io = new Server(httpsServer, {
    cors: {
        origin: "https://localhost:5173", // Stelle sicher, dass du hier deine tatsächliche Client-URL angibst
        methods: ["GET", "POST"],
        credentials: true
    }
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

// listen to a connection
    socket.on("addNewUser", (userId) => {
!onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId: socket.id
         });
         console.log("onlineUsers", onlineUsers);

         io.emit("getOnlineUsers", onlineUsers);
    });

    // add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);
    
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {senderId: message.senderId, isRead: false,
                date: new Date(),});
        }
    });
    

    socket.on("disconnect", () =>   {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });



});

// HTTPS-Server starten
const PORT = 3002; // Stelle sicher, dass dieser Port sich nicht mit anderen Diensten überschneidet
httpsServer.listen(PORT, () => {
    console.log(`Socket.IO HTTPS-Server läuft auf Port ${PORT}`);
});