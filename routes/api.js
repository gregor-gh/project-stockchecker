'use strict';
const { stockPriceRequest } = require("../stock/stock.js");

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const stock = req.query.stock;
      const like = req.query.like;

      const response = await stockPriceRequest(stock, like, req.ip);
      res.send(response);
    });

};
