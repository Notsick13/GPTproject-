const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Route to create a new product
router.post('/createProduct', productController.createProduct);

// Route to get all products
router.get('/getProducts', productController.getProducts);

// Route to get a single product by ID
router.get('/getProduct/:id', productController.getProduct);

// Route to update a product by ID
router.put('/updateProduct/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/deleteProduct/:id', productController.deleteProduct);

// Route to create a review for a product
router.post('/createReview/:id/reviews', productController.createReview);

// Route to get reviews for a product
router.get('/getReviews/:id/reviews', productController.getReviews);

// Route to generate a PDF report of products
router.get('/pdf', productController.generatePdf);

module.exports = router;