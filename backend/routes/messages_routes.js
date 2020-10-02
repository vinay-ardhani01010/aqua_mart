const express = require('express');

const router = express.Router();
const messagesControllers=require('../controllers/messages_controllers');


//gets all messages
router.get('/',messagesControllers.getMessages);
module.exports = router;
