const express = require("express")
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require("body-parser")

const { initConnection } = require("./db");
const defaultQueue = require('./queue');

const indexRouter = require("./routes/index")
const bookRouter = require("./routes/books");
const userRouter = require("./routes/users");

const { PORT } = process.env;

const app = express();

app.use(expressLayouts)
app.set("view engine", "ejs")

app.set("views", __dirname + '/views')
app.set("layout", "layouts/layout")

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use((req, res, next) => {
    req.defaultQueue = defaultQueue;

    next();
})

app.use('/', indexRouter)
app.use('/books', bookRouter)
app.use('/user', userRouter)



initConnection((err) => {
    if (err) log(err);
    
    app.listen(PORT, () => {
        console.log(`Listening http://localhost:${PORT}`);
    })
});