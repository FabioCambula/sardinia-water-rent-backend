const { body, validationResult } = require("express-validator");

const validateBooking = [
  body("user").notEmpty().withMessage("User is required"),
  body("product").notEmpty().withMessage("Product is required"),
  body("startDate").isISO8601().withMessage("Start date must be valid"),
  body("endDate").isISO8601().withMessage("End date must be valid"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateBooking;
