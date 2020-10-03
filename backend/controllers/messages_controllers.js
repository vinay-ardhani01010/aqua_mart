const MessageSchema=require("../models/messages_models");

const getMessages=(req,res,next) => {
  const {status,description}=req.body;
  MessageSchema.find({})
  .then(messages =>{
    //send ejs file messages array after completing .ejs file(front end)
    return res.render('displayMessages',messages)
  })
  .catch(err => console.log(err));
  
}

exports.getMessages = getMessages;
