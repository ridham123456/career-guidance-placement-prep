const mongoose = require('mongoose');

const topicProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    module: {
      type: String,
      required: true,
      enum: ['technical', 'interview', 'resume']
    },
    topicId: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound index to ensure 1 entry per user per module & topic
topicProgressSchema.index({ userId: 1, module: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model('TopicProgress', topicProgressSchema);

