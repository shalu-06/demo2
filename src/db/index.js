const express = require('express')

const app = express()

const port = procvess.env.PORT || 3000


app.use(express.json())
app.post('/user',(req, res) => {
    console.log(req.body)
    res.send('Testing!')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})