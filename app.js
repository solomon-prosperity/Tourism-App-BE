const express = require ('express')
const app = express()
const destinationRoute = require ('./routes/destinationRoutes')
const reviewRoute = require ('./routes/reviewsRoute')

const dotenv = require('dotenv')




dotenv.config();

const port = process.env.PORT
const db = require('./config/config')
db()

app.use('/photos' ,express.static('uploads/DestinationPhotos'))
app.use('/avatar' ,express.static('uploads/avatars'))

app.use(express.json());



app.use('/api/v1/destinations' , destinationRoute )
app.use('/api/v1/destinations/reviews' , reviewRoute )


app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})