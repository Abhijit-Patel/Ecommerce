const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const { category, sort } = req.query;
  let query = {};
  if (category) query.category = category;
  let sortOptions = {};
  if (sort === 'asc') sortOptions.price = 1;
  if (sort === 'desc') sortOptions.price = -1;

  try {
    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts };