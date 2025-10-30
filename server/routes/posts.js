// routes/posts.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addComment,
} = require('../controllers/postsController');

// /api/posts
// only authenticated users can create posts
router.route('/')
    .get(getPosts)
    .post(protect, authorize('author','admin'), createPost);

// /api/posts/:id
// only authors or admins can update/delete
router.route('/:id')
    .get(getPostById)
    .put(protect, authorize('author','admin'), updatePost)
    .delete(protect, authorize('admin'), deletePost);

// /api/posts/:id/comments
router.route('/:id/comments')
    .post(addComment);

module.exports = router;
