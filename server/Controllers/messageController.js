const messageModel = require('../Models/messageModel');

//create a message

const createMessage = async (req, res) => {
  const {chatId, senderId, text} = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    text
  });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    req.status(500).json(error.message);
  }
};

//get a message
const getMessage = async (req, res) => {

  const {chatId} = req.params;

  try {
    const message = await messageModel.find({chatId});
    res.status(200).json(message);
  } catch (errr) {
    console.log(error.message);
    req.status(500).json(error.message);
  }
};

module.exports = {createMessage, getMessage};