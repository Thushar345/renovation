const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const waitlistRoutes = require('./routes/waitlistRoutes');  // Import waitlist routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the Cluster (default database will be used for Auth)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Cluster'))
.catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/waitlist', waitlistRoutes); 


// Wake-Up Route
app.get('/api/wake', (req, res) => {
  res.status(200).send({ message: 'Server is up and running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
