const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const panelRoutes = require("./routes/panel");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");

const crypto = require("crypto");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
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
  app.use(authRoutes);
  app.use(panelRoutes);

  app.listen(process.env.PORT, () => {
    console.log("Server in ascolto..");
  });
});
