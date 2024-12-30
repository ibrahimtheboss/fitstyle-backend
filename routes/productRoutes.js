const express = require('express');
const multer = require('multer');
const Product = require('../models/productModel');
const path = require('path');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique file names
  },
});
const upload = multer({ storage: storage });

// Route to upload product image
router.post('/upload-image', upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Route to create a product
router.post('/add-product', async (req, res) => {
  const { name, category, description, price, image } = req.body;

  try {
    const newProduct = new Product({ name, category, description, price, image });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().lean(); // Use .lean() to get plain JavaScript objects

    // Rename _id to id
    const formattedProducts = products.map(product => {
      product.id = product._id;
      delete product._id; // Remove the original _id
      return product;
    });

    res.status(200).json(formattedProducts); // Send the modified product list
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a product
router.put('/update-product/:id', async (req, res) => {
  const { name, category, description, price, image } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, description, price, image },
      { new: true }
    );

    // Rename _id to id
    product.id = product._id;
    delete product._id;

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a product
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Rename _id to id
    product.id = product._id;
    delete product._id;

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
