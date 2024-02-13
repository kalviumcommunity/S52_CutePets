const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
    breed: String,
    type: String,
    characteristics: Array
})

const PetModel = mongoose.model("breedofpets", PetSchema)
module.exports = PetModel