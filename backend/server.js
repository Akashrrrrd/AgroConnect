// Import required modules
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Verify the path to serviceAccountKey.json
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('serviceAccountKey.json file not found at', serviceAccountPath);
  process.exit(1);
}

// Initialize Firebase Admin SDK
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agro-connect-ef789.firebaseio.com" // Update with your database URL if using Realtime Database
});

// Initialize Firestore
const db = admin.firestore();

// Initialize Express app
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// API Routes
app.get('/orders', async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/orders/:id', async (req, res) => {
  try {
    const orderRef = db.collection('orders').doc(req.params.id);
    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ id: orderDoc.id, ...orderDoc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { product, status, price } = req.body;
    if (!product || !status || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newOrderRef = await db.collection('orders').add({ product, status, price });
    res.status(201).json({ id: newOrderRef.id, product, status, price });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/orders/:id', async (req, res) => {
  try {
    const { product, status, price } = req.body;
    const orderRef = db.collection('orders').doc(req.params.id);
    await orderRef.update({ product, status, price });
    res.status(200).json({ id: req.params.id, product, status, price });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    const orderRef = db.collection('orders').doc(req.params.id);
    await orderRef.delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const productRef = db.collection('products').doc(req.params.id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price, available } = req.body;
    if (!name || !price || available === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProductRef = await db.collection('products').add({ name, price, available });
    res.status(201).json({ id: newProductRef.id, name, price, available });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { name, price, available } = req.body;
    const productRef = db.collection('products').doc(req.params.id);
    await productRef.update({ name, price, available });
    res.status(200).json({ id: req.params.id, name, price, available });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productRef = db.collection('products').doc(req.params.id);
    await productRef.delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
