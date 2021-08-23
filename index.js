const express = require("express")
const app = express()
const price = require("./routes/price")

app.use(express.json())

app.use("/price", price)

app.listen(8080,()=>console.log("💻 at port 8080"))