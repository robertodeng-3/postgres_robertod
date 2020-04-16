const express = require('express')
const path = require('path')



const app = express()
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.send('Server is Up')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})