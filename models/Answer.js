const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    content: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postedAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
