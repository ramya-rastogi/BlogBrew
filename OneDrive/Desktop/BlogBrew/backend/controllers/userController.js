const User = require('../models/User');

// Get saved boards for the logged-in user
exports.getSavedBoards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedBoards.blogs',
      populate: { path: 'author', select: 'username' }
    });

    res.status(200).json(user.savedBoards);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch saved boards', error: err.message });
  }
};