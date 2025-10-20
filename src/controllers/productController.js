// controllers/productController.js
const Product = require("../models/Product");

// LISTA TUTTI I PRODOTTI
const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// OTTIENI UN PRODOTTO SPECIFICO
const getProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) {
      return res.status(404).json({ message: "Prodotto non trovato" });
    }
    return res.status(200).json(prod);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREA UN NUOVO PRODOTTO
const createProduct = async (req, res) => {
  const { name, description, price, photo, stock } = req.body;

  if (!name || !description || price == null || stock == null) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
  }

  try {
    const exists = await Product.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Prodotto già esistente" });
    }

    const newProduct = new Product({ name, description, price, photo, stock });
    const saved = await newProduct.save();
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// AGGIORNA UN PRODOTTO
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Prodotto non trovato" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ELIMINA UN PRODOTTO
const deleteProduct = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: "Prodotto non trovato" });
    }
    return res.status(200).json({ message: "Prodotto eliminato con successo" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
