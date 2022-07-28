const Product = require('../models/product');
const Util = require('../Util/Util');


const product_add = (req, res) => {
    console.log(req.files);

    if (!req.files[0]) {
        return res.json({ status: 422, msg: 'Please add an image!' });
    } else if (req.files.length > 5) {
        return res.json({ status: 300, msg: 'Maximum 5 images allowed' });
    }

    const product = new Product(req.body);

    req.files.forEach((file, i) => {
        product.images[i] = file.path
    })

    product.save()
        .then(result => {
            res.json({ status: 200, data: result });
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message })
            console.log(err);
        });
}

const seller_products = (req, res) => {
    Product.find({ seller_id: req.body.seller_id }).sort({ createdAt: -1 })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, msg: "No product found"  });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message });
        });
}


const products = (req, res,) => {

    Product.find().sort({ createdAt: -1 })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, msg: "No product found" });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message });
        });
}



const product_by_ID = (req, res) => {

    Product.findOne({ _id: req.params.id })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, msg: "No product found with given ID"  });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message });
        });
};



const product_update = (req, res) => {

    Product.findOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            if (result != null && result.length != 0) {
                if (result.seller_id == req.body.seller_id) {
                   
                    Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
                        .then(result => {
                            result != null ? res.json({ status: 200, msg: 'Product data updated successfully', data: result }) :
                                res.json({ status: 300, msg: 'Something went wrong, please contact customer advisor' });
                        })
                        .catch(err => {
                            res.json({ status: 300, msg: 'Something wrong to update product data' });
                        });
                } else {
                    res.json({ status: 300, msg: "You don't have permission to edit this products"  });
                }
            } else {
                res.json({ status: 300, data: { msg: "No product found with given ID" } });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message });
        });
}




const product_delete = (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result != null && result.length != 0) 
                res.json({ status: 200, msg: 'Product deleted successfully'});
            else
                res.json({ status: 300, msg: 'Product not found'});
        })
        .catch(err => {
            res.json({ status: 400,msg: err.message });
            console.log(err);
        });
}

module.exports = {
    products,
    seller_products,
    product_add,
    product_by_ID,
    product_update,
    product_delete
};