const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  let { productId, quantity } = req.body;
  quantity = parseInt(quantity);
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [] });

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.totalPrice += product.price * quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex === -1) throw new Error("Product not found in cart");
    const product = cart.products[productIndex];
    const productDetails = await Product.findById(product.productId);
    
    product.quantity -= quantity;

    if (product.quantity <= 0) {
      cart.products.splice(productIndex, 1);
    }
    cart.totalPrice -= productDetails.price * quantity;
    if (cart.totalPrice < 0) cart.totalPrice = 0;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { addToCart, removeFromCart };