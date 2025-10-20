const { Schema, model } = require("mongoose");

const bookingProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["confirmed", "completed"],
    default: "confirmed",
  },
});

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [bookingProductSchema],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Booking", bookingSchema);
