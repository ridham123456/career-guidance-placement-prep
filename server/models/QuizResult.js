const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quizName: {
      type: String,
      required: [true, 'Quiz name is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'General Aptitude'],
      default: 'General Aptitude'
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    correctAnswers: {
      type: Number,
      required: true
    },
    wrongAnswers: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    attemptedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('QuizResult', quizResultSchema);

