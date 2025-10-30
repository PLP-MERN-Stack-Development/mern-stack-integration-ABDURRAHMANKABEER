const Category = require('../models/Categories');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Public 
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
        }

        const existing = await Category.findOne({ name });
        if (existing) {
        return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
        return next(new ErrorResponse('Category not found', 404));
        }

        res.status(200).json({
        success: true,
        data: category,
        });
    } catch (error) {
        console.error('❌ Error in getCategoryById:', error); // logs real issue
        next(error); // pass raw error to middleware, don’t replace it
    }
};


// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Public (will be admin later)
exports.updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Public (will be admin later)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
