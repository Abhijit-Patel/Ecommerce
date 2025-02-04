const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addToCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);

module.exports = router;