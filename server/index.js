// express will allow us to create our server
const express = require("express")
//cors will allow us to communicate with our front end
const cors = require("cors")
//mongoose will allow us to save data
const mongoose = require("mongoose")

const userRouter = require("./Routes/userRoute")

const {MongoClient, ServerApiVersion} = require('mongodb');

const app = express();
require("dotenv").config();

//these will add extra capabilities to our funktionality
app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to our Chat app");
});


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;


app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected")).catch(err => console.log
("MongoDB connection failed: ", err.message))
