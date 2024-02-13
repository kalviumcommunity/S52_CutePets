const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const petRoutes = require("./routes");
const PetModel = require("./models/Petmodels");

const mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("Connected to MongoDB using Mongoose");
});

app.use(cors());
app.use(express.json());
app.use("/pets", petRoutes);

app.get("/", (req, res) => {
  if (db.readyState === 1) {
    res.send("Connected to MongoDB successfully");
  } else {
    res.send("Failed to connect to MongoDB");
  }
});
app.get("/pets", (req, res) => {
  PetModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.listen(4000, () => {
  console.log("Server is running at port 4000");
});
