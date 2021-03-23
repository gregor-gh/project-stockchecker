require('dotenv').config();
const { MongoClient } = require('mongodb');

const connect = async () => {
  // connect to db
  const URI = process.env.DB;
  const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db("ProjectStockChecker");

  return db
}