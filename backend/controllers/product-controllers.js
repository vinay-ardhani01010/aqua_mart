const Product = require('../models/product.model');


//get products from vendor for admin
//route- getProductsFromVendorsForAdmin

const getProductsFromVendorsForAdmin = (req,res,next) => {
  const vendorId = req.params.vendorId;
  Product.find({vendorId})
  .then(products => {
    return res.render(products)
}).catch(err => console.log(err))

}

exports.getProductsFromVendorsForAdmin = getProductsFromVendorsForAdmin;
