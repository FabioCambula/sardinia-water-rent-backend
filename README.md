# Sardinia Water Rent – Backend

Backend RESTful API del progetto **Noleggio Prodotti**, sviluppato in Node.js con Express e MongoDB (Atlas).  
Gestisce autenticazione, prenotazioni, stock e ruoli utente.

## ⚠️ Note sul Deployment

### Primo caricamento lento
Il backend è hostato su Render (piano gratuito), che mette il server in "sleep mode" dopo 15 minuti di inattività. 

**Al primo accesso dopo un periodo di inattività, il caricamento può richiedere 30-60 secondi** mentre il server si risveglia. Le richieste successive saranno veloci e fluide.

Questo è normale per i servizi gratuiti e non rappresenta un problema di performance dell'applicazione.

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
