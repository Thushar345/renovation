const jwt = require('jsonwebtoken');

const User = require('../models/User'); 


const register = async (req, res) => {
    const { name, semester, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    //create and save the new user
    const user = new User({ name, semester, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};


const dashboard = (req, res) => {
    res.json({ message: `Hello ${req.user.email}, you accessed the user dashboard` });
};

module.exports = { register, login, dashboard };
