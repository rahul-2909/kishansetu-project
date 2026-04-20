const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const router = express.Router();

// CLOUDINARY IMAGE UPLOAD SETUP
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'kishansetu_products',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

const upload = multer({ storage });

// ALL routes below require a valid JWT token
router.use(protect);

// ==========================================
// 1. SELLER PROFILE APIS
// ==========================================
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

router.put('/profile', async (req, res) => {
    try {
        const { fullName, phone, description } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (fullName) user.fullName = fullName;
        if (phone) user.phone = phone;
        if (description) user.description = description;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

// ==========================================
// 2. SELLER LOCATION APIS
// ==========================================
router.get('/location', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('village city state');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch location' });
    }
});

router.put('/location', async (req, res) => {
    try {
        const { village, city, state } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (village) user.village = village;
        if (city) user.city = city;
        if (state) user.state = state;

        await user.save();

        res.json({
            message: 'Location updated successfully',
            village: user.village,
            city: user.city,
            state: user.state
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update location' });
    }
});

// ==========================================
// 3. SELLER PRODUCTS APIS
// ==========================================
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

// ADD PRODUCT + IMAGE UPLOAD
router.post('/products', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const imageUrl = req.file.path; // ✅ correct for cloudinary

        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            price: Number(req.body.price),
            quantity: req.body.quantity || '',
            image: imageUrl,
            seller: req.user.id
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully!',
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE PRODUCT
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.seller.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await product.deleteOne();

        res.json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
});


// ==========================================
// DASHBOARD HOME STATS API
// ==========================================

// GET /api/seller/stats
router.get('/stats', async (req, res) => {
    try {
        // Get total products for this farmer
        const totalProducts = await Product.countDocuments({ seller: req.user.id });

        // Get user info for location and phone
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            totalProducts,
            profileViews: '154', // We keep this simple for now
            location: user.village && user.city && user.state ? `${user.village}, ${user.city}, ${user.state}` : 'Not Set',
            phone: user.phone || 'Not Set',
            description: user.description || ''
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
});

module.exports = router;