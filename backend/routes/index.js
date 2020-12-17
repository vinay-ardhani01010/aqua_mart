const express = require('express');
const router = express.Router();
const isUser = require('../middleware/is-user');
const isVendor = require('../middleware/is-vendor');
const isAdmin = require('../middleware/is-admin');
const apiMain = require('./api-main');
let Product = require('../models/product.model');
let Users = require('../models/user.model');
let Vendors = require('../models/Vendor');
const path = require('path');
const { getVendorsForAdmin } = require('../controllers/vendor');
const app = express()

// Welcome Page

router.get('/', (req, res) => res.render('logreg'));

// User Dashboard
// router.route('/dashboard').get(isUser,(req, res) => { 
//   Product.find({isAuthorised: true}, function(err, data){
//       res.render('dashboard', { 
//          products : data.slice(0,6)
//       });
//   });
// });
// admin dashboard
router.route('/dashboardAdmin').get((req,res)=>{
  Product.find({})
  .then(products =>{
    Users.find({})
    .then(users =>{
      Vendors.find({})
      .then(vendors =>{
        res.render('dashboardmain',{products,users,vendors});
      })
    })
  })
  
})
router.route('/dashboard').get(isUser,(req, res) => { 
  Product.find({isAuthorised: true}, function(err, data){
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(error, location) {
         
          res.render('dashboard', {
            products : data,
            brand : brand,
            cats : category,
            location : location,
            feature : data.slice(0,3),
         });
        });
      });
    }); 
  });
});
router.route('/products').get(isUser,(req, res) => { 
  Product.find({}, function(err, data){
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(error, location) {
        
          res.render('productview.ejs', {
            products : data,
            brand : brand,
            cats : category,
            location : location,
            feature : data.slice(0,3),
         });
        });
      });
    }); 
  });
});


// Admin Dashboard
router.route('/admindashboard').get(isUser,(req, res) => { 
  Product.find({}, function(err, data){
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(error, location) {
         
          res.render('admindashboard', {
            products : data,
            brand : brand,
            cats : category,
            location : location,
            feature : data.slice(0,3),
         });
        });
      });
    }); 
  });
});
//ADMIN DASHBOARD AUTH PRODUCTS

router.route('/authproducts').get((req, res) => { 
  Product.find({isAuthorised: true}, function(err, data){
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(error, location) {
         
          res.render('authorized', {
            products : data,
            brand : brand,
            cats : category,
            location : location,
            feature : data.slice(0,3),
         });
        });
      });
    }); 
  });
});
//UNAUTHARIZED PRODUCTS
router.route('/unauthproducts').get(isUser,(req, res) => { 
  Product.find({isAuthorised: false}, function(err, data){
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(error, location) {
         
          res.render('unauthorize', {
            products : data,
            brand : brand,
            cats : category,
            location : location,
            feature : data.slice(0,3),
         });
        });
      });
    }); 
  });
});

// Vendor Dashboard
router.get('/vendordashboard/:mail',isVendor, (req, res) =>{
 Vendors.find({email:req.params.mail})
 .then(vendor =>{
   //res.render('vendorpage',{vendor})
   Product.find({vendorname:vendor[0].name})
   .then(products=>{
     //console.log(products)
     res.render('vendorpage',{vendor,products})
     
   })
   
 })
 //console.log(req.params.mail)
})


// Services
router.get('/services', isUser, (req, res) => res.render('services'));

// About Us
router.get('/aboutus', isUser, (req, res) => res.render('aboutus'));

// Contact us
router.get('/contactus', isUser, (req, res) => res.render('contactus'));

// Meet the teem,
router.get('/team', isUser, (req, res) => res.render('team'));

// Api main
router.use('/api/main', apiMain);

//filters
router.get('/filter',(req, res)=>{
  console.log(req.body)
  var querylist = req.query;
  if(req.query.price){
    var li = req.query;
    var n=-1;
    if (req.query.price=='low'){
      n = 1
    }
    delete li.price 
  Product.find( li).sort({price:n}).exec( (err,data)=>{
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(err, location) {            
              res.render('dashboard', { 
                products : data.slice(0,3),
                brand : brand,
                cats : category,
                location : location
        });
      });
    });
    })
    })
  }
  else {
    Product.find( querylist,function (err,data){
    Product.find().distinct('category', function(error, category) {
      Product.find().distinct('brand', function(error, brand) {
        Product.find().distinct('vendorlocation', function(err, location) {
              res.render('dashboard', { 
                products : data,
                brand : brand,
                cats : category,
                location : location
        });
      });
    });
    })
    })
  }
})


  //FILTER ADMIN DASHBOARD

  router.get('/filteradmin',(req, res)=>{
    console.log(req.body)
    var querylist = req.query;
    if(req.query.price){
      var li = req.query;
      var n=-1;
      if (req.query.price=='low'){
        n = 1
      }
      delete li.price 
    Product.find( li).sort({price:n}).exec( (err,data)=>{
      Product.find().distinct('category', function(error, category) {
        Product.find().distinct('brand', function(error, brand) {
          Product.find().distinct('vendorlocation', function(err, location) {            
                res.render('admindashboard', { 
                  products : data.slice(0,3),
                  brand : brand,
                  cats : category,
                  location : location
          });
        });
      });
      })
      })
    }
    else {
      Product.find({isAuthorised:true},(err,data)=>{
        Product.find(querylist,function (err,data){
          Product.find().distinct('category', function(error, category) {
            Product.find().distinct('brand', function(error, brand) {
              Product.find().distinct('vendorlocation', function(err, location) {
                    res.render('admindashboard', { 
                      products : data,
                      brand : brand,
                      cats : category,
                      location : location
              });
            });
          });
          })
        })
        }
      )
    }
  })
router.get('/analysis',(req,res)=>{
  Product.find({})
  .then(products =>{
    Users.find({})
    .then(users =>{
      Vendors.find({})
      .then(vendors =>{
        res.render('dashboardmain',{products,users,vendors});
      })
    })
  })
})
  
module.exports = router;
