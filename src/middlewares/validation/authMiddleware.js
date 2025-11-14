const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Accesso negato" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Utente non trovato" });

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };
    next();
  } catch {
    res.status(401).json({ message: "Token non valido" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accesso riservato agli admin" });
  }
  next();
};

module.exports = { auth, isAdmin };
