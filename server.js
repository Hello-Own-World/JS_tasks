const express = require("express")
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require("body-parser")

const app = express()

const indexRouter = require("./routes/index")
const bookRouter = require("./routes/books")

mongoose.connect("mongodb://localhost:27017/js_task", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

console.log(mongoose.connection.readyState + "ASDADADASDASD");

db.on('error', error => console.error(error))
db.once('open', open => console.log("Connecterd to mongoose"))

app.use(expressLayouts)
app.set("view engine", "ejs")

app.set("views", __dirname + '/views')
app.set("layout", "layouts/layout")

app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))


app.use('/', indexRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)