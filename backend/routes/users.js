const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const authController = require('../controllers/users');
const isUser = require('../middleware/is-user');

//User home route
router.get('/', authController.getHome);

//login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

//signup routes
router.get('/register', authController.getSignup);
router.post('/register', authController.postSignup);

//logout routes
router.get('/logout', isUser, authController.logout);
router.get('/usersForAdmin',(req,res)=>{
    //some backend work to be done here 
    User.find({})
    .then((users)=>{
        return res.render('listofuser',{users});
    }).catch((error)=>console.log(error));
    
})

module.exports = router;
