require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// CORS configurato per sviluppo e produzione
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // aggiungeremo questo dopo
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ===== Import rotte =====
const userRoutes = require("./src/routes/users");
const productRoutes = require("./src/routes/products");
const orderRoutes = require("./src/routes/orders");
const cartRoutes = require("./src/routes/cart");
const bookingRoutes = require("./src/routes/booking");

// ===== Usa le rotte =====
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/bookings", bookingRoutes);

// ===== Middleware per errori =====
app.use(errorHandler);

// ===== Avvio server =====
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server avviato su porta ${PORT}`));
});
