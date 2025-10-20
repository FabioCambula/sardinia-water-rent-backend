const Cart = require("../models/Cart");
const Booking = require("../models/Booking");
const Product = require("../models/Product");

// 📌 Lista prenotazioni (admin)
const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("products.product", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 Lista prenotazioni utente loggato
const listUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("products.product", "name description price")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 Get prenotazione singola
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "-password")
      .populate("products.product");

    if (!booking) {
      return res.status(404).json({ message: "Prenotazione non trovata" });
    }
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 Crea prenotazione dal carrello
const createBookingFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Il carrello è vuoto" });
    }

    const newBooking = new Booking({
      user: req.user.id,
      products: cart.products.map((item) => {
        const { product, quantity, startDate, endDate } = item;
        return {
          product: product._id,
          quantity,
          startDate,
          endDate,
          status: "confirmed", // default alla creazione
        };
      }),
      totalPrice: cart.totalPrice,
    });

    const savedBooking = await newBooking.save();

    // 🔹 Scala stock prodotti
    for (const item of cart.products) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // 🔹 Svuota carrello
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json(savedBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 📌 Aggiorna stato di un singolo prodotto nella prenotazione
const updateBookingItemStatus = async (req, res) => {
  try {
    const { bookingId, itemId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId).populate(
      "products.product"
    );
    if (!booking)
      return res.status(404).json({ message: "Prenotazione non trovata" });

    const item = booking.products.id(itemId);
    if (!item)
      return res
        .status(404)
        .json({ message: "Prodotto non trovato nella prenotazione" });

    const prevStatus = item.status;
    item.status = status;
    await booking.save();

    // 🔹 Se passa a "completed", restituiamo stock
    if (status === "completed" && prevStatus !== "completed") {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: item.quantity },
      });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Elimina prenotazione
const deleteBooking = async (req, res) => {
  try {
    const removed = await Booking.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: "Prenotazione non trovata" });
    }
    return res
      .status(200)
      .json({ message: "Prenotazione eliminata con successo" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listBookings,
  listUserBookings,
  getBooking,
  createBookingFromCart,
  updateBookingItemStatus,
  deleteBooking,
};
