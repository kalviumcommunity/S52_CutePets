const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Joi = require("joi");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const app = express();
const petRoutes = require("./routes");
const userRoutes = require("./userRoutes")
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

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use("/pets", petRoutes);
app.use("/auth", userRoutes)

app.get("/", (req, res) => {
  if (db.readyState === 1) {
    res.send("Connected to MongoDB successfully");
  } else {
    res.send("Failed to connect to MongoDB");
  }
});
app.get("/pets", (req, res) => {
  PetModel.find()
    .then((pets) => res.json(pets))
    .catch((err) => res.json(err));
});

const createPetSchema = Joi.object({
  breed: Joi.string().required().pattern(new RegExp('^[A-za-z ]+$')).messages({
    'string.pattern.base': `"breed" should only contain alphabetic characters`
  }),
  type: Joi.string().required().pattern(new RegExp('[A-za-z ]+$')).messages({
    'string.pattern.base': `"type" should only contain alphabetic characters`
  }),
  created_by: Joi.string().required()
})

const updatePetSchema = Joi.object({
  breed: Joi.string().required().pattern(new RegExp('^[A-za-z ]+$')).messages({
    'string.pattern.base': `"breed" should only contain alphabetic characters`
  }),
  type: Joi.string().required().pattern(new RegExp('[A-za-z ]+$')).messages({
    'string.pattern.base': `"type" should only contain alphabetic characters`
  }),
})

app.post("/createPet", (req, res) => {
  const {error} = createPetSchema.validate(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }

  PetModel.create(req.body)
  .then(eachPet => res.json(eachPet))
  .catch(err => res.json(err))
})

app.get("/getPet/:id", (req, res) => {
  const id = req.params.id
  PetModel.findById({_id:id})
  .then(pet => res.json(pet))
  .catch(err => res.json(err))
})

app.put("/updatePet/:id", (req, res) => {
  const {error} = updatePetSchema.validate(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }

  const id = req.params.id
  PetModel.findByIdAndUpdate({_id: id}, {breed: req.body.breed, type: req.body.type})
  .then(pet => res.json(pet))
  .catch(err => res.json(err))
})

app.delete("/deletePet/:id", (req, res) => {
  const id = req.params.id
  PetModel.findByIdAndDelete({_id: id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})

app.listen(process.env.PORT, () => {
  console.log("Server is running at port 4000");
});
