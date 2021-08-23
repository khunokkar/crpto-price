const express = require("express")
const routes = express.Router()
const {getPrice} = require("../get-price")

routes.get("/:name", async (req,res) => {
  try {
    const name = req.params.name
    const data = await getPrice(name)
    if(data) return res.json(data)
  } catch(err){
    if(err) res.status(400).json(err.message)
  }
})

module.exports = routes