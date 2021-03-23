'use strict';
const { stockPriceRequest } = require("../stock/stock.js");

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      const stock = req.query.stock;
      const like = req.query.like;

      return res.send("TEST")
      
      const response = stockPriceRequest(stock, like, req.ip);
      res.send(response);
    });
    
};
