const express = require("express");
const router = express.Router();
const { validateUser, auth, isAdmin, isSelfOrAdmin } = require("../middlewares/validation");
const userController = require("../controllers/userController");

// Route to get all users (admin only)
router.get("/", auth, isAdmin, userController.listUsers);

// Route to get a single user by ID (self or admin)
router.get("/:id", auth, isSelfOrAdmin, userController.getUser);

// Route to create a new user (registration - open)
router.post("/register", validateUser, userController.createUser);

// Route to update a user by ID (self or admin)
router.put("/:id", auth, validateUser, isSelfOrAdmin, userController.updateUser);

// Route to delete a user by ID (admin only, or allow self-delete if vuoi)
router.delete("/:id", auth, isSelfOrAdmin, userController.deleteUser);


//login

router.post("/login", userController.loginUser);

module.exports = router;
