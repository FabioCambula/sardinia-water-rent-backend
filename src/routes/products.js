const express= require('express');
const router= express.Router();
const{ validateProduct, auth, isAdmin } = require('../middlewares/validation')
const productController= require('../controllers/productController');

// Route to get all products
router.get('/', productController.listProducts);
// Route to get a single product by ID
router.get('/:id', productController.getProduct);
// Route to create a new product
router.post('/', auth, isAdmin, validateProduct, productController.createProduct);
// Route to update a product by ID
router.put('/:id',auth, isAdmin, validateProduct, productController.updateProduct);
// Route to delete a product by ID
router.delete('/:id',auth, isAdmin, productController.deleteProduct);

module.exports= router;