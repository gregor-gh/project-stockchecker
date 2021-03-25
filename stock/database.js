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

const addLike = async (stock, ip) => {
  try {
    // connect
    const db = await connect();

    // set table
    const collection = db.collection("likes");

    // check if stock has been added to db
    let check = await collection.findOne({ stock: stock });

    // and if it hasn't add it to the db
    if (!check) {
      await collection.insertOne({ stock: stock, likes: 0, ip: [] });
      check = await collection.findOne({ stock: stock });
    }

    // if IP has not already liked this stock then add a like
    if (!check || !check.ip.includes(ip)) {
      await collection.updateOne({
        stock: stock
      }, {
        $set:
          { ip: [...check?.ip, ip], likes: check.likes+1 }
      });
      return "added like";
    }

    // otherwise do nothing
    return "already liked";
  } catch (error) {
    console.log(error);
    return "error";
  }
}

const getLikes = async (stock) => {
  try {
    // connect
    const db = await connect();

    // set table
    const collection = db.collection("likes");

    // check if stock has been added to db
    const check = await collection.findOne({ stock: stock });

    // return number of likes or 0 if stock wasn't found
    return check?.likes || 0;

  } catch (error) {
    console.log(error)
  }

}

module.exports = { addLike, getLikes };