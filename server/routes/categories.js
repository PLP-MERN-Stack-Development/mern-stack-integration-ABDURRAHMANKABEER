// routes/categories.js
const express = require('express');
const router = express.Router();
const {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoriesController');

// /api/categories
router.route('/')
    .get(getCategories)
    .post(createCategory);

// /api/categories/:id
router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;