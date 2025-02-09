const express = require('express');
const router = express.Router();
const Waitlist = require('../models/waitlist');

// POST route to add data to WaitlistDB
router.post('/', async (req, res) => {
    const { name, email, semester, feature } = req.body;

    try {
        const newEntry = new Waitlist({ name, email, semester, feature });
        await newEntry.save();
        res.status(201).json({ message: 'Waitlist entry added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to waitlist', error: error.message });
    }
});

module.exports = router;
