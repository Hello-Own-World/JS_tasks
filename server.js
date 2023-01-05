if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require("express")
const mongoose = require("mongoose");

const app = express()
// const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")

// mongoose.connect("mongodb://localhost:27017/collectionName", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// });

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log("Connecterd to mongoose"))

app.set("view engine", "ejs")
// app.set("views", __dirname + "/views")
// app.set("layout", "layouts/layout")
// app.set(expressLayouts)
// app.use(express.static("public"))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)