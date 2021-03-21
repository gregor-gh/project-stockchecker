function stockPriceRequest(stock, like) {

  // first check if the passed stock is an array or a string
  if (!isArray(stock)) {
    // get single stock price
    // first check if there is a like, add to db if so
    if (like) {
      
    }

  } else {
    // compare two stock prices
    // check if array length is 2
    if (stock.length != 2) {
      return "Error"
    }
  }
}

function addLike() {
  
}

module.exports = { stockPriceRequest }