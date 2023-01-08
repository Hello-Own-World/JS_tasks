const express = require("express")
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require("body-parser")

const { initConnection } = require("./db");
const indexRouter = require("./routes/index")
const bookRouter = require("./routes/books");

const { PORT } = process.env;

const app = express()

app.use(expressLayouts)
app.set("view engine", "ejs")

app.set("views", __dirname + '/views')
app.set("layout", "layouts/layout")

app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))


app.use('/', indexRouter)
app.use('/books', bookRouter)

initConnection((err) => {
    if (err) throw err;
    
    app.listen(PORT, () => {
        console.log(`Listening http://localhost:${PORT}`);
    })
});
