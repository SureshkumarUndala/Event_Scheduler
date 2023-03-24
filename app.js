const express = require('express')
const app = express()
const Router = require("./route/router")
const mongoose = require('mongoose')



const port = process.env.PORT || 5000
const MongoURL ="mongodb://localhost/events"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(MongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('mongoose is connected...'))
    .catch((err) => console.log(err))
app.use('/v1/events',Router)


app.listen(port, () => console.log(`server is up at 5000 port....`)) 









