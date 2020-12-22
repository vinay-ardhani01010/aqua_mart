const express = require('express');
const MessageSchema = require("../models/messages_models");

const router = express.Router();
const messagesControllers=require('../controllers/messages_controllers');


//gets all messages
router.post("/sendmessage",(req,res)=>{
  const status = req.body.status;
  const message = req.body.message;
 const  newMessage = new MessageSchema({
     status,
     message
 }) ;
  newMessage.save()
        .then(() => console.log("added"))
        .catch(err => res.status(400).json('Error: '+ err));
})
router.get('/showmessages',messagesControllers.getMessages);
module.exports = router;
