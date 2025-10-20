const express = require('express');
const router = express.Router();
const { validateOrder, auth, isAdmin, isSelfOrAdmin } = require("../middlewares/validation");
const orderController = require('../controllers/orderController');

// Route to get all orders
router.get('/',auth, isAdmin, orderController.listOrders);
// Route to get a single order by ID
router.get('/:id', auth, isSelfOrAdmin, orderController.getOrder);
// Route to create a new order
router.post('/', auth, validateOrder, orderController.createOrder);
// Route to update an order by ID
router.put('/:id',auth, isSelfOrAdmin, orderController.updateOrder);
// Route to delete an order by ID
router.delete('/:id',auth, isSelfOrAdmin, orderController.deleteOrder);

module.exports = router;

