const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// GET /api/buyer/profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Buyer profile fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch buyer profile' });
  }
});

// PUT /api/buyer/profile
router.put('/profile', async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (fullName !== undefined) user.fullName = fullName;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Buyer update error:', error);
    res.status(500).json({ message: 'Failed to update buyer profile' });
  }
});

// GET /api/buyer/sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }).select('fullName phone village city state description');

    const sellerData = await Promise.all(sellers.map(async (seller) => {
      const products = await Product.find({ seller: seller._id }).limit(4).select('name category');
      return {
        _id: seller._id,
        fullName: seller.fullName,
        phone: seller.phone,
        location: [seller.village, seller.city, seller.state].filter(Boolean).join(', ') || 'Location not set',
        description: seller.description || 'No seller description available.',
        category: products.length > 0 ? products[0].category : 'Local Produce',
        products: products.map((product) => product.name),
        productCount: products.length,
      };
    }));

    res.json(sellerData);
  } catch (error) {
    console.error('Buyer sellers fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch seller list' });
  }
});

// GET /api/buyer/sellers/:id
router.get('/sellers/:id', async (req, res) => {
  try {
    const seller = await User.findOne({ _id: req.params.id, role: 'seller' }).select('-password');
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const products = await Product.find({ seller: seller._id }).sort({ createdAt: -1 }).select('name price quantity category image');

    res.json({
      seller: {
        _id: seller._id,
        fullName: seller.fullName,
        phone: seller.phone,
        village: seller.village,
        city: seller.city,
        state: seller.state,
        description: seller.description || 'No description available.',
      },
      products,
      location: [seller.village, seller.city, seller.state].filter(Boolean).join(', ') || 'Location not set',
      category: products.length > 0 ? products[0].category : 'Local Produce',
    });
  } catch (error) {
    console.error('Buyer seller profile fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch seller profile' });
  }
});

module.exports = router;
