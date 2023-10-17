const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.delete('/products', productController.deleteAllProducts);
router.get('/products/published', productController.findPublishedProducts);
router.get('/products/search', productController.findProductsByName);

module.exports = router;
