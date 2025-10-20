const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          // prezzo giornaliero al momento dell’aggiunta
          type: Number,
          required: true,
          min: 0,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        totalPrice: {
          // totale riga (calcolato: price * quantity * days)
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calcolo automatico del totale carrello e di ogni riga
cartSchema.pre("save", function (next) {
  this.totalPrice = this.products.reduce((acc, item) => {
    const days =
      Math.ceil(
        (item.endDate.getTime() - item.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    item.totalPrice = item.price * item.quantity * days;

    return acc + item.totalPrice;
  }, 0);

  next();
});


module.exports = model("Cart", cartSchema);
