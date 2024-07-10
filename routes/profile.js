// routes/profile.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

router.get('/', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        
        const questions = await Question.find({ userId: user._id }).sort({ postedAt: -1 })
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId',
                    select: 'username'
                }
            })
            .exec();
        
        const answers = await Answer.find({ userId: user._id }).sort({ postedAt: -1 })
            .populate({
                path: 'questionId',
                populate: {
                    path: 'userId',
                    select: 'username'
                }
            }).exec();
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            questions: questions,
            answers: answers
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

module.exports = router;
