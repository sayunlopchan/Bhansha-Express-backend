const Product = require('../models/Product');

// Add a product
exports.addProduct = async (req, res) => {
  const { title, price, discount, description } = req.body;
  const newProduct = new Product({
    title, price, discount, description, image: req.file.filename
  });
  await newProduct.save();
  res.status(201).send('Product added');
};

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { title, price, discount, description } = req.body;
  const updateData = { title, price, discount, description };
  if (req.file) updateData.image = req.file.filename;
  await Product.findByIdAndUpdate(req.params.id, updateData);
  res.send('Product updated');
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send('Product deleted');
};
