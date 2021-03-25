const db = require("./database.js");

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

    return likes;
  }


  // compare two stock prices
  // check if array length is 2
  if (stock.length != 2) {
    return "Error"
  }
  return "two stock"
}

function addLike(stock, ip) {

}

module.exports = { stockPriceRequest }