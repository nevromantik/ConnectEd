const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const crypto = require('crypto');

require("dotenv").config();

const app = express();

// // Genera un access token secret casuale
// function generateAccessTokenSecret() {
//     return crypto.randomBytes(64).toString('hex');
//   }
  
//   // Utilizza la funzione per generare un nuovo secret e stampalo in console
//   const accessTokenSecret = generateAccessTokenSecret();
//   console.log('Access Token Secret:', accessTokenSecret);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const dbURI = "mongodb://127.0.0.1:27017/ConnectED";
mongoose.connect(dbURI);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Errore nella connessione al database:", error);
});

db.once("open", () => {
  console.log("Connessione al database avvenuta con successo");
  app.use( authRoutes)
  app.listen(process.env.PORT, () => {
    console.log("Server in ascolto..");
  });
});
