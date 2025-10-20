const isSelfOrAdmin = (req, res, next) => {
  // Se l'utente è admin → sempre permesso
  if (req.user.role === "admin") {
    return next();
  }

  // Se l'utente normale sta provando ad accedere al proprio profilo → permesso
  if (req.user._id.toString() === req.params.id) {
    return next();
  }

  // Altrimenti → accesso negato
  return res.status(403).json({ message: "Accesso non autorizzato" });
};

module.exports = isSelfOrAdmin;
