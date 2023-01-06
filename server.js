if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require("express")
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts')

const app = express()

const indexRouter = require("./routes/index")
const bookRouter = require("./routes/books")

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', open => console.log("Connecterd to mongoose"))

app.use(expressLayouts)
app.set("view engine", "ejs")

app.set("views", __dirname + '/views')
app.set("layout", "layouts/layout")


app.use('/', indexRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)