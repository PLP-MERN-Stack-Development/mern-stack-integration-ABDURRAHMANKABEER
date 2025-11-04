const Post = require('../models/Post');
const Category = require('../models/Categories');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all posts or filter by category
// @route   GET /api/posts?category=slug
// @access  Public
exports.getPosts = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = category ? { category } : {};

        const posts = await Post.find(filter)
            .populate("author", "name email")
            .populate("category", "name slug")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// @desc    Get single post by ID or slug
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email')
            .populate('category', 'name slug');

        if (!post) return next(new ErrorResponse('Post not found', 404));

        // Increment view count each time it’s fetched
        await post.incrementViewCount();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public (will secure later)
exports.createPost = async (req, res) => {
    try {
        const { title, content, excerpt, featuredImage, category, tags } = req.body;
        const author = req.user.id; 
        
        if (!title || !content || !author || !category) {
        return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // Ensure category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
        return res.status(404).json({ message: 'Invalid category' });
        }

        const post = await Post.create({
        title,
        content,
        excerpt,
        featuredImage,
        category,
        author,
        tags,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Public (will secure later)
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Public (will secure later)
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// GET /api/posts/me
// @desc    Get posts of logged-in user
// @route   GET /api/posts/me
// @access  Private
exports.getMyPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ author: req.user._id })
            .populate('category', 'name')
            .populate('author', 'name email');

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
};


// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Public
exports.addComment = async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!content) {
        return res.status(400).json({ message: "Comment is required" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.addComment(userId, content);
        res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
