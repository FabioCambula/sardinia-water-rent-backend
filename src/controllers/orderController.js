// controllers/orderController.js
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

// LISTA ORDINI
const listOrders = async (req, res) => {
  try {
    const { from, to, productId } = req.query;
    const filter = {};

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    if (productId) {
      filter["products.product"] = productId;
    }

    const orders = await Order.find(filter)
      .populate("user")
      .populate("products.product");

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// OTTIENI UN ORDINE
const getOrder = async (req, res) => {
  try {
    const found = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");

    if (!found) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREA UN ORDINE
const createOrder = async (req, res) => {
  try {
    // 📌 Trova il carrello dell'utente
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Il carrello è vuoto" });
    }

    // 📌 Controllo stock per ogni prodotto
    for (let item of cart.products) {
      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `Disponibili solo ${item.product.stock} unità di "${item.product.name}"`,
        });
      }
    }

    // 📌 Scala lo stock
    for (let item of cart.products) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // 📌 Crea l'ordine
    const newOrder = new Order({
      user: req.user.id,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    });

    const savedOrder = await newOrder.save();

    // 📌 Svuota il carrello
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json(savedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// AGGIORNA UN ORDINE
const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ELIMINA UN ORDINE
const deleteOrder = async (req, res) => {
  try {
    const removed = await Order.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }
    return res.status(200).json({ message: "Ordine eliminato con successo" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
