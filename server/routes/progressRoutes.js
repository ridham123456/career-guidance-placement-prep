const express = require('express');
const router = express.Router();
const {
  getProgress,
  toggleTopicProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProgress);
router.post('/topic', protect, toggleTopicProgress);

module.exports = router;

