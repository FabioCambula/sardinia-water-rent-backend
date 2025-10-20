module.exports = {
  validateProduct: require("./validateProduct"),
  validateUser: require("./validateUser"),
  validateOrder: require("./validateOrder"),
  validateCart: require("./validateCart"),
  validateBooking: require("./validateBooking"),
  isSelfOrAdmin: require("./isSelfOrAdmin"),
  auth: require("./authMiddleware").auth,
  isAdmin: require("./authMiddleware").isAdmin,
};
