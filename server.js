const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layouts", "layouts/layout")
app.set(expressLayouts)
app.use(express.static("public"))

app.listen(process.env.PORT || 3000)