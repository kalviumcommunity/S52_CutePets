const express = require('express')
const mongoose = require('mongoose')
const app = express()

const mongoURI = 'mongodb+srv://pet_user_01:cutepets123@pets.dsug72y.mongodb.net/CutestPets?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', () => {
    console.log("Connected to MongoDB using Mongoose")
})

app.get('/', (req, res) => {
    if(db.readyState === 1){
        res.send("Connected to MongoDB successfully")
    }else{
        res.send("Failed to connect to MongoDB")
    }
})
app.listen(3000, () => {
    console.log("Server is running at port 3000")
})