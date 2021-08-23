const cheerio = require("cheerio")
const axios = require("axios")
const pretty = require("pretty")

// this will fetch price of a specific coin.
async function getPrice(coin){  
  try{
    const url = `https://coinmarketcap.com/currencies/${coin}/`
    const {data} = await axios.get(url)
    const $ = cheerio.load(data)
    const div = $(".main-content").children().eq(1).children().eq(0).children().eq(0).children().eq(1).children().eq(0)
    const currentPrice = $(div).children().eq(1).children().eq(1).children().eq(0).text()
    const name = $(div).find("h1").text()
    return {
      name,
      currentPrice
    }
  } catch(err){
    console.log("Unable to fetch data.")
  }
}

module.exports = {
  getPrice 
}
