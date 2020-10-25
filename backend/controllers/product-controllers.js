const Product = require('../models/product.model');


//get products from vendor for admin
//route- getProductsFromVendorsForAdmin

const getVendorProd = (req,res,next) => {
  res.render("listofuser");

}

exports.getVendorProd = getVendorProd;
