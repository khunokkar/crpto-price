const cheerio = require("cheerio")
const axios = require("axios")
const pretty = require("pretty")

// for learning purpose only
// this will fetch top ten coins
// by market cap
async function topCoins(){
  try{
    const url = "https://coinmarketcap.com/"
    const {data} = await axios({
      method : 'POST',
      url
    })
    const $ = cheerio.load(data)
    const rows = $("tbody").find("tr")
    const arr = []
    const keys = Object.keys(arr)
    rows.each((i,ele)=>{
       const td = $(ele).children()
       td.each((index,item)=>{
           let name;
           let price;
           // coin name
           if(index == 2){
            name = $(item).find("div > div > div > p").text()
            if(name){
              arr.push(name)
            }
           }
           // coin price
           if(index == 3){
             price = $(item).find('div > a').text()
            if(price){
              arr.push(price)
            }
           }
       })
    })
    const prices = {}
    for(let i = 0; i < arr.length; i+=2){
      prices[arr[i]] = arr[i+1] 
    }
    console.log("CURRENT TOP COINS BY MARKET CAP:")
    console.log(prices)
  }catch(err){
    if(err) console.log(err)
  }
}

// this will fetch price of a specific coin.
async function getPrice(coin){  
  try{
    const url = `https://coinmarketcap.com/currencies/${coin}/`
    const {data} = await axios.get(url)
    const $ = cheerio.load(data)
    const div = $(".main-content").children().eq(1).children().eq(0).children().eq(0).children().eq(1).children().eq(0)
    const currentPrice = $(div).children().eq(1).children().eq(1).children().eq(0).text()
    const name = $(div).find("h1").text()
    // console.log(name, currentPrice)
    return {
      name,
      currentPrice
    }
  } catch(err){
    console.log("Unable to fetch data.")
  }
}

module.exports = {
  topCoins,
  getPrice 
}