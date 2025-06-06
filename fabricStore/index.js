const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

// Your MongoDB connection string
const uri = "mongodb+srv://admin:Omesairam%40123@cluster0.3jsruxr.mongodb.net/fabricStore?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB using Mongoose");

    const productSchema = new mongoose.Schema({}, { strict: false });
    const Product = mongoose.model('products', productSchema, 'products');

    app.get('/products', async (req, res) => {
      try {
        const result = await Product.find({});
        res.json(result);
      } catch (err) {
        console.error("❌ Query error:", err);
        res.status(500).send("Query failed");
      }
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
