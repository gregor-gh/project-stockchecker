const db = require("./database.js");
const axios = require("axios")

async function stockPriceRequest(stock, like, ip) {

  // first check if the passed stock is an array or a string
  if (!Array.isArray(stock)) {
    // get single stock price
    // first check if there is a like, add to db if so
    if (like) {
      await db.addLike(stock, ip)
    }

    // now get the number of likes
    const likes = await db.getLikes(stock);

    // fetch the api data
    const response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);

    return {
      stockData: {
        stock: response?.data?.symbol,
        price: response?.data?.iexRealtimePrice,
        likes: likes
      }
    };
  }


  // compare two stock prices
  // check if array length is 2
  if (stock.length != 2) {
    return "Error"
  }

  // add both sets of likes
  if (like) {
    await db.addLike(stock[0], ip);
    await db.addLike(stock[1], ip);
  }


  // and get likes
  const like1 = await db.getLikes(stock[0]) || 0;
  const like2 = await db.getLikes(stock[1]) || 0;
  const rel_likes = like1 - like2;

  // get both stock prices
  const response1 = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[0]}/quote`);
  const response2 = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[1]}/quote`);

  return {
    stockData: [{
      stock: response2?.data?.symbol,
      price: response2?.data?.iexRealtimePrice,
      rel_likes: -rel_likes
    }, {
      stock: response1?.data?.symbol,
      price: response1?.data?.iexRealtimePrice,
      rel_likes: rel_likes
    }]
  };

}

module.exports = { stockPriceRequest }