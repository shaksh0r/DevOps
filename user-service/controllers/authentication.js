const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

// User Registration Endpoint
exports.register =  async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            password: await bcrypt.hash(password, 10), // Hash the password
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user._id,
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};