const express = require("express");
const router = express.Router();
const { auth, validateCart } = require("../middlewares/validation");
const cartController = require("../controllers/cartController");

// Lista carrello
router.get("/", auth, cartController.listCart);

// Aggiungi prodotto al carrello
router.post("/", auth, cartController.addToCart);

// Aggiorna un item (quantità / date)
router.put("/", auth, cartController.updateCartItem);

// Rimuovi un singolo item
router.delete("/:itemId", auth, cartController.removeFromCart);

// Svuota tutto il carrello
router.delete("/", auth, cartController.clearCart);

module.exports = router;
