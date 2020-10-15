const Vendor=require('../models/Vendor');
const Product = require('../models/product.model');


//get products from vendor for admin
//route- getProductsFromVendorsForAdmin

const getProductsFromVendorForAdmin=(req,res,next) => {
  const vendorId = req.params.vendorId;
  Product.find({vendorId})
  .then(products => {
    return res.render('',{
      products,
      path:''
    })
  })

}

exports.getProductsFromVendorForAdmin = getProductsFromVendorForAdmin;