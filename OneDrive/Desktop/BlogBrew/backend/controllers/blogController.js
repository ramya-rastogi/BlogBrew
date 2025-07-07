const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, genre, tags, image } = req.body;

    const newBlog = new Blog({
      title,
      content,
      genre,
      tags,
      image,
      author: req.user.id // pulled from authMiddleware
    });

    const savedBlog = await newBlog.save();

    // Re-fetch with populated author username
    const populatedBlog = await Blog.findById(savedBlog._id).populate('author', 'username');

    res.status(201).json(populatedBlog);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create blog', error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch blogs', error: err.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch blog', error: err.message });
  }
};

// ✅ NEW: Delete a blog (only if user is author)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'You are not authorized to delete this blog' });
    }

    await blog.deleteOne();

    res.status(200).json({ msg: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete blog', error: err.message });
  }
};