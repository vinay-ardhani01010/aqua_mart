const router = require('express').Router();
let Product = require('../models/product.model');
const mainController = require('../controllers/main');
const isUser = require('../middleware/is-user');
const productControllers = require('../controllers/product-controllers');


router.route('/add').post((req, res) => {
    const name = req.body.name;
    const vendorid = req.session.user._id;
    const description = req.body.description;
    const price = Number(req.body.price);
    const vendorname = req.body.vendorname;
    const imgurl = req.body.imgurl;
    const category = req.body.category;
    const brand = req.body.brand;
    const vendorlocation = req.body.vendorlocation;
    const isAuthorised = false;

    const newProduct = new Product({
        name,
        vendorid,
        description,
        price,
        vendorname,
        imgurl,
        category,
        brand,
        vendorlocation,
        isAuthorised
    });

    newProduct.save()
        .then(() => res.render('addproduct'))
        .catch(err => res.status(400).json('Error: '+ err));
});

// /products/:id
router.get('/:id', isUser, mainController.getProduct);
router.get('/auth/:id',(req, res, next) => {
    Product.findById(req.params.id)
      .then(product => {
        return res.render('productauth.ejs', {
           product:product,
            name: product.name ,
            description: product.description,
            price: product.price,
            vendorname: product.vendorname,
            imgurl: product.imgurl,
            category: product.category,
            brand: product.brand,
            vendorlocation: product.vendorlocation,
            vendorid : product.vendorid,
            id:product._id,
            Auth:product.isAuthorised,
            path: '/products'
        })
      })
      

    })
    router.get('/unauth/:id',(req, res, next) => {
        Product.findById(req.params.id)
          .then(product => {
            return res.render('productunauth.ejs', {
               product:product,
                name: product.name ,
                description: product.description,
                price: product.price,
                vendorname: product.vendorname,
                imgurl: product.imgurl,
                category: product.category,
                brand: product.brand,
                vendorlocation: product.vendorlocation,
                vendorid : product.vendorid,
                id:product._id,
                Auth:product.isAuthorised,
                path: '/products'
            })
          })
          
    
        })

// delete product
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => console.log('Product deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

//update product post request
router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = Number(req.body.price);
            product.vendorname = req.body.vendorname;
            product.imgurl = req.body.imgurl;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.vendorlocation = req.body.vendorlocation;
            product.isAuthorised = false;
            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

// get request for editing product
router.route('/update/:id').get((req, res) => {
    Product.findById(req.params.id, (err, product)=>{
        res.render('updateProduct',{
            title: 'Edit Product',
            product:product
        });
    });
});
router.route('/delete/:id').get((req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then((resp)=>{
        res.statusCode = 200
        res.redirect('/admindashboard')
     },(err)=>{
        console.log(err)
     }).catch((err)=>{
        console.log(err)
     })
})
router.route('/unauthorize/:id').get((req,res)=>{
    Product.findById(req.params.id)
    .then((product)=>{
        product.isAuthorised = false
        product.save()
        .then(()=>res.redirect('/authproducts')) 
        .catch(err => res.status(400).json('Error: '+ err));
     },(err)=>{
        console.log(err)
     }).catch((err)=>{
        console.log(err)
     })
})
router.route('/authorize/:id').get((req,res)=>{
    Product.findById(req.params.id)
    .then((product)=>{
        product.isAuthorised = true
        product.save()
        .then(()=>res.redirect('/unauthproducts')) 
        .catch(err => res.status(400).json('Error: '+ err));
     },(err)=>{
        console.log(err)
     }).catch((err)=>{
        console.log(err)
     })
})
router.route('/auth/:id')

//list of products when admin clicks on a vendor

//router.get('/vendorProducts/:vendorName',productControllers.getVendorProd);
router.route('/vendorProducts').get((req,res)=>{
    res.render(listofuser);
})


module.exports = router;
