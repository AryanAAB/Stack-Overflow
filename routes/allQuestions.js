const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ postedAt: -1 })
            .populate('userId', 'username')
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId',
                    select: 'username'
                }
            })
            .exec();
        res.render('allQuestions', { questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/answers', async (req, res) => {
    const { content } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const newAnswer = new Answer({
            content,
            questionId: question._id,
            userId: user._id
        });

        await newAnswer.save();

        question.answers.push(newAnswer._id);
        await question.save();

        res.status(201).json(newAnswer);
    } catch (error) {
        console.error('Could not create new answer:', error);
        res.status(500).json({ message: 'Answer Creation error' });
    }
});

module.exports = router;
