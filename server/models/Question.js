const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability']
    },
    question: {
      type: String,
      required: true,
      trim: true
    },
    options: {
      type: [String],
      required: true,
      validate: [val => val.length === 4, 'Must provide exactly 4 options']
    },
    correctAnswer: {
      type: Number, // 0-based index (0, 1, 2, 3)
      required: true
    },
    explanation: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', questionSchema);

