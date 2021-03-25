const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  let likes; // store the current number of likes here
  let rel_likes; // store to rel likes here

  test("Viewing one stock: GET request to /api/stock-prices/", done => {
    chai.request(server)
      .get("/api/stock-prices?stock=GOOG")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.hasAllKeys(res.body, ["stockData"], "Response should have a stockData object");
        assert.isNumber(res.body.stockData.likes, "likes should be a number");
        assert.hasAllKeys(res.body.stockData, ["stock", "price", "likes"], "Response should contain stock, price and likes");
        assert.equal(res.body.stockData.stock, "GOOG", "Response stock should still be GOOG");
        assert.isNumber(res.body.stockData.price, "price should be a number");

        likes = res.body.stockData.likes;

        done();
      });
  }).timeout(10000);

  test("Viewing one stock and liking it: GET request to /api/stock-prices/", done => {
    chai.request(server)
      .get("/api/stock-prices?stock=GOOG&like=true")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.hasAllKeys(res.body, ["stockData"], "Response should have a stockData object");
        assert.hasAllKeys(res.body.stockData, ["stock", "price", "likes"], "Response should contain stock, price and likes");
        //assert.equal(res.body.stockData.likes, likes + 1, "Number of likes should have increased by one");
        assert.equal(res.body.stockData.stock, "GOOG", "Response stock should still be GOOG");
        done();
      });
  }).timeout(10000);

  test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", done => {
    chai.request(server)
      .get("/api/stock-prices?stock=GOOG&like=true")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.hasAllKeys(res.body, ["stockData"], "Response should have a stockData object");
        assert.hasAllKeys(res.body.stockData, ["stock", "price", "likes"], "Response should contain stock, price and likes");
        //assert.equal(res.body.stockData.likes, likes + 1, "Number of likes should have stayed the same");
        assert.equal(res.body.stockData.stock, "GOOG", "Response stock should still be GOOG");
        done();
      });
  }).timeout(10000);

  test("Viewing two stocks: GET request to /api/stock-prices/", done => {
    chai.request(server)
      .get("/api/stock-prices?stock=GOOG&stock=MSFT")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.hasAllKeys(res.body, ["stockData"], "Response should have a stockData object");
        assert.isArray(res.body.stockData, "Response should contain stock array");
        assert.hasAllKeys(res.body.stockData[0], ["stock", "price", "rel_likes"], "Response should contain stock, price and rel_likes");
        assert.hasAllKeys(res.body.stockData[1], ["stock", "price", "rel_likes"], "Response should contain stock, price and rel_likes");
        assert.equal(res.body.stockData[0].stock, "MSFT", "First stock should be second sent");
        assert.equal(res.body.stockData[1].stock, "GOOG", "Second stock should be first sent");

        rel_likes = res.body.stockData[1].rel_likes;

        assert.equal(res.body.stockData[0].rel_likes, -rel_likes, "The two rel_likes should be equal but negative");


        done();
      });
  }).timeout(10000);

  test("Viewing two stocks and liking them: GET request to /api/stock-prices/", done => {
    chai.request(server)
      .get("/api/stock-prices?stock=GOOG&stock=MSFT&like=true")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.hasAllKeys(res.body, ["stockData"], "Response should have a stockData object");
        assert.isArray(res.body.stockData, "Response should contain stock array");
        assert.hasAllKeys(res.body.stockData[0], ["stock", "price", "rel_likes"], "Response should contain stock, price and rel_likes");
        assert.hasAllKeys(res.body.stockData[1], ["stock", "price", "rel_likes"], "Response should contain stock, price and rel_likes");

        //assert.equal(res.body.stockData[1].rel_likes, rel_likes - 1, "Rel likes should have increased due to liking MSFT");

        done();
      });
  }).timeout(10000);

});
