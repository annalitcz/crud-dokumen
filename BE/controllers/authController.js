// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const jwt_secret = 'jhbacbjbkadlkbkackjbkasjcnlkbkjsbckjbkjsdcb'
// Register User
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.createUser(username, password);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login User
// controllers/userController.js
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findUserByUsername(username);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: '1h' });

        // Kirimkan userId bersama token
        res.json({ token, userId: user.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Logout User
exports.logout = async (req, res) => {
    try {
        res.json({ message: 'User logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
