const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate('answers').exec();
        res.render('all-questions', { questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const newQuestion = new Question({
            title,
            description,
            userId: user._id,
        });

        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Could not create new question:', error);
        res.status(500).json({ message: 'Question Creation error' });
    }
});

module.exports = router;