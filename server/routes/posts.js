// routes/posts.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddlware');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addComment,
    getMyPosts
} = require('../controllers/postsController');

// /api/posts
// only authenticated users can create posts
router.route('/')
    .get(getPosts)
    .post(protect, authorize('author','admin'), upload.single('image'), createPost);

// /api/posts/me
router.get('/me', protect, getMyPosts);

// /api/posts/:id
// only authors or admins can update/delete
router.route('/:id')
    .get(getPostById)
    .put(protect, authorize('author','admin'), upload.single('image'), updatePost)
    .delete(protect, authorize('admin'), deletePost);

// /api/posts/:id/comments
router.route('/:id/comments')
    .post(addComment);

module.exports = router;
