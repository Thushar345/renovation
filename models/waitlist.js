const mongoose = require('mongoose');

// Use 'WaitlistDB' explicitly when defining the schema
const waitlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    semester: { type: String, required: true },
    feature: { type: String, required: true }
});

// Specify the 'WaitlistDB' database explicitly
const Waitlist = mongoose.connection.useDb('WaitlistDB').model('waitlist', waitlistSchema);

module.exports = Waitlist;
