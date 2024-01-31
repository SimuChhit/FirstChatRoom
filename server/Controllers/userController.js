const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

        return jwt.sign({_id}, jwtkey, {expiresIn: "1h"});
};

const registerUser = async (req, res) => {

    try{
        const {name, email, password} = req.body

        let user = await userModel.findOne({email})

        if(user) return res.status(400).json("User with the given already exists");

        if(!name || !email || !password) return res.status(400).json("All fields are required");

        if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email address");

        if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");

        user = new userModel({name, email, password});

        //this will encrypt the password (hashing)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name, email, token})
    }
    catch (error) {
        res.status(500).json(error.message)
    }

};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        let user = await userModel.findOne({email});

        if(!user) return res.status(400).json("Invalid credentials");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) return res.status(400).json("Invalid password");

        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.name, email, token});
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
};

const getUsers = async (req, res) => {
    try{
        const users = await userModel.find();

        res.status(200).json(users);
    }catch(error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};


const findUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);

        res.status(200).json(user);

    }catch(error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

module.exports = {registerUser, loginUser, findUser, getUsers};