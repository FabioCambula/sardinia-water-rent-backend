# Sardinia Water Rent – Backend

Backend RESTful API del progetto **Noleggio Prodotti**, sviluppato in Node.js con Express e MongoDB (Atlas).  
Gestisce autenticazione, prenotazioni, stock e ruoli utente.

## 🚀 Funzionalità principali
- Registrazione e login con hashing password (**bcrypt**).  
- Gestione sessioni con cookie e `withCredentials`.  
- CRUD per prodotti e ordini.  
- Middleware di validazione input e protezione delle rotte.  
- Sistema admin per chiusura e gestione prenotazioni.  
- Aggiornamento automatico dello stock in base alle date prenotate.  

## 🛠️ Stack Tecnologico
- **Server:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Autenticazione:** JWT + cookie + bcrypt  
- **Middleware:** cors, express-validator, cookie-parser  
- **Hosting:** Railway
  [Frontend](https://github.com/FabioCambula/sardinia-water-rent-frontend)
🔗 [Vai al mio progetto](https://sardinia-water-rent.vercel.app/)
