const express = require('express');

const router = express.Router();

router.get('/chatApp',(req,res) => {
  res.sendFile(__dirname + "/chatApp.html");
})

module.exports = router;
