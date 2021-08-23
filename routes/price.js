const express = require("express")
const routes = express.Router()
const {getPrice} = require("../get-price")
const coins = require("../util/coins")

routes.get("/:name", async (req,res) => {
  try {
    const name = req.params.name.toLowerCase()
    let coinName
    for(let key in coins){
      let value = coins[key]
      if(key == name.toLowerCase()){
        coinName = value
      }
    }
    if(!coinName) coinName = name
    const data = await getPrice(coinName)
    if(data) return res.json(data)
  } catch(err){
    if(err) res.status(400).json(err.message)
  }
})

module.exports = routes