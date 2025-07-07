const express = require('express');
const router = express.Router();
const { getSavedBoards } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/user/boards
// @desc    Get all saved boards (protected)
router.get('/boards', authMiddleware, getSavedBoards);

module.exports = router;