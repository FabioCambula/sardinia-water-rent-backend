const express = require("express");
const router = express.Router();
const { auth, isAdmin, isSelfOrAdmin } = require("../middlewares/validation");
const bookingController = require("../controllers/bookingController");

// Lista tutte le prenotazioni (solo admin)
router.get("/", auth, isAdmin, bookingController.listBookings);

// Lista prenotazioni utente loggato
router.get("/mine", auth, bookingController.listUserBookings);

// Dettaglio singola prenotazione
router.get("/:id", auth, bookingController.getBooking);

// Crea prenotazione da carrello
router.post("/", auth, bookingController.createBookingFromCart);

// Aggiorna stato singolo prodotto in una prenotazione
router.put("/:bookingId/items/:itemId", auth, isAdmin, bookingController.updateBookingItemStatus);

// Elimina prenotazione
router.delete("/:id", auth, isAdmin, bookingController.deleteBooking);

module.exports = router;