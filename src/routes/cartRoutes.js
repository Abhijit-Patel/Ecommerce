const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addToCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);

module.exports = router;