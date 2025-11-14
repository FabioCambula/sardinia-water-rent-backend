const Cart = require("../models/Cart");
const Product = require("../models/Product");

// 📌 LIST CART
const listCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product");
    //.populate("user", "-password")

    if (!cart || cart.products.length === 0) {
      return res.status(200).json({ message: "Cart is empty", products: [] });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, startDate, endDate } = req.body;

    if (!productId || !quantity || !startDate || !endDate) {
      return res.status(400).json({ message: "Dati mancanti" });
    }

    // 🔹 Trova il prodotto
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Prodotto non trovato" });
    }

    // 🔹 Controllo stock
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Disponibili solo ${product.stock} unità di "${product.name}"`,
      });
    }

    // 🔹 Trova o crea il carrello
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    // 🔹 Aggiungi nuova riga
    cart.products.push({
      product: productId,
      quantity,
      price: product.price, // prezzo giornaliero congelato
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 UPDATE CART ITEM
const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity, startDate, endDate } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Carrello non trovato" });
    }

    const item = cart.products.find((p) => p._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: "Prodotto non nel carrello" });
    }

    if (quantity) item.quantity = quantity;
    if (startDate) item.startDate = new Date(startDate);
    if (endDate) item.endDate = new Date(endDate);

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 REMOVE FROM CART (singolo item)
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Carrello non trovato" });
    }

    cart.products = cart.products.filter(
      (item) => item._id.toString() !== itemId
    );

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 CLEAR CART (svuota tutto)
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Carrello non trovato" });
    }

    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();
    return res.status(200).json({ message: "Carrello svuotato" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
