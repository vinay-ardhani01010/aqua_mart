const Vendor=require('../models/Vendor');
const Product = require('../models/product.model');


//get products from vendor for admin
//route- getProductsFromVendorsForAdmin

const getProductsFromVendorsForAdmin=(req,res,next) => {
  const vendorId = req.params.vendorId;
  Product.find({vendorId})
  .then(products => {
    res.render('',{
      products,
      path:''
    })
  })

}

exports.getProductsFromVendorsForAdmin = getProductsFromVendorsForAdmin;