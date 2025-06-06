const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

const uri = "mongodb+srv://admin:Omesairam%40123@cluster0.3jsruxr.mongodb.net/fabricStore?retryWrites=true&w=majority&tls=true";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: false
});

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("fabricStore");
    const products = db.collection("products");

    app.get('/products', async (req, res) => {
      try {
        const result = await products.find().toArray();
        res.json(result);
      } catch (err) {
        console.error("Query Error:", err);
        res.status(500).send("❌ MongoDB query failed");
      }
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();
