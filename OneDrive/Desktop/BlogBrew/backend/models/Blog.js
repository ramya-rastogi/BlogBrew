const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  image:   { type: String }, // base64 or image URL
  genre:   { type: String, required: true },
  tags:    [String],
  views:   { type: Number, default: 0 },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);