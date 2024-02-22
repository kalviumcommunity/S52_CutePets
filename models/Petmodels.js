const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
    breed: String,
    type: String,
    created_by: String
})

const PetModel = mongoose.model("breedofpets", PetSchema)
module.exports = PetModel