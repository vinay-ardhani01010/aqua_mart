const MessageSchema=require("../models/messages_models");

const getMessages=(req,res,next) => {
  const {status,description}=req.body;
  MessageSchema.find()
  .then(message =>{
    return res.render('',{
      message_status:message.status,
      message_description:message.description,
      message_id:message._id,
      path:'/messages'
    })
  })
  .catch(err => console.log(err));
  
}

exports.getMessages = getMessages;