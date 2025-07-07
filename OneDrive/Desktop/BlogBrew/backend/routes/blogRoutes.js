const express = require('express');
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog // ✅ newly added
} = require('../controllers/blogController');

const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/blogs
// @desc    Create a new blog (protected)
router.post('/', authMiddleware, createBlog);

// @route   GET /api/blogs
// @desc    Fetch all blogs (public)
router.get('/', getAllBlogs);

// @route   GET /api/blogs/:id
// @desc    Fetch a single blog by ID (public)
router.get('/:id', getBlogById);

// ✅ NEW ROUTE
// @route   DELETE /api/blogs/:id
// @desc    Delete a blog by ID (only if owned by user)
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;