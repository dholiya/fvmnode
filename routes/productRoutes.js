const express = require("express");
const productController = require('../controllers/productController');
const router = express.Router();
const upload = require('../middleware/upload');  
const Util = require('../Util/Util');


require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/all', authenticateToken, productController.products);
router.get('/all/seller', authenticateToken, productController.seller_products);

router.post('/', upload, productController.product_add);
router.get('/:id', productController.product_by_ID);

router.patch('/:id', authenticateToken, productController.product_update);
router.delete('/:id', productController.product_delete);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      console.log(err)

      if (err) return res.sendStatus(403)
      req.id = id
      next()
    })
  }

module.exports = router;