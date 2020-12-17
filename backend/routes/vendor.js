const express = require('express');
const router = express.Router();
const authController = require('../controllers/vendor');
const isVendor = require('../middleware/is-vendor');
const Message = require('../models/messages_models');
let Product = require('../models/product.model');
const vendorsControllers = require('../controllers/vendor');

//Vendor home route
router.get('/', authController.getHome);

//login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

//signup routes
router.get('/register', authController.getSignup);
router.post('/register', authController.postSignup);

//send route
router.post('/send', isVendor, authController.postSend);

//logout routes
router.get('/logout', isVendor, authController.logout);

//contact routes
router.get('/contact', authController.getContact);
router.post('/contact', authController.postContact);

//product routes
router.get('/addProduct', authController.getAddProduct);
router.get('/myProducts', authController.getProducts);

// Mesages
/*router.get('/getunseen',(req, res)=>{
    Message.find({seen :0, receiver : req.user.sessions._id},(err, data)=>{
        console.log(data.length)
        res.status(200).send(data.length.toString())
     });
});*/

//list of vendors for admin
router.get('/vendorsForAdmin',vendorsControllers.getVendorsForAdmin);
router.get('/prod/:name',(req,res)=>{
    console.log(req.params.name)
    Product.find({vendorname : req.params.name})
    .then(list =>{
       res.render('vendorprodlist',{list});
      
    })
})
router.get('/authvendor',(req,res)=>{
    Product.find({isAuthorize : true})
    .then(list =>{
        res.render('authForvendor',{list});
    })
})
router.get('/dashboardVendor/:name',(req,res)=>{
   Product.find({vendorname:req.params.name})
   .then(products =>{
       var count = 0;
       for( const i in products){
       if(products[i].isAuthorised){
           count+=1;
       }
       }
    res.render('dashboardvendor',{products,count})
   })
})
router.route('/dashboardVendor/vendor/additem').get((req,res)=>{
    res.render('addproductvendor.ejs')
})
module.exports = router;
