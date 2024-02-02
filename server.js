const express = require('express')
const app = express()

app.get('/ping', (req, res) => {
    res.json({'ping': "pong"})
})
app.listen(3000, () => {
    console.log("Server is running at port 3000")
})