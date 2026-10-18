const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Aptitude Preparation',
        'Coding Preparation',
        'Interview Preparation',
        'Resume Preparation',
        'Career Resources'
      ]
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    link: {
      type: String,
      required: [true, 'Link URL is required'],
      trim: true
    },
    badge: {
      type: String,
      default: 'Recommended'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Resource', resourceSchema);

