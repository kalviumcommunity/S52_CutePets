const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const petRoutes = require('./routes')

const mongoURI = process.env.mongoURI
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', () => {
    console.log("Connected to MongoDB using Mongoose")
})

app.use(express.json())
app.use('/pets', petRoutes)

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