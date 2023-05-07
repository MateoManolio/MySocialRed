const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Welcome to @frontend')
})

app.get('/users', (req, res) => {
    const user = {
        firstName: 'Mateo',
        lastName: 'Manolio'
    }
    res.send(user)
})

app.listen(port, () => console.log(`server started at port ${port}`))

