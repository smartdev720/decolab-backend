const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const path = require('path');
const setupWebSocketServer = require('./sockets');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('./config/passport')(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', passport.authenticate('jwt', { session: false }), projectRoutes);
app.use('/api/user', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/api/post', passport.authenticate('jwt', { session: false }), postRoutes);
app.use('/api/notification', passport.authenticate('jwt', { session: false }), notificationRoutes);

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

setupWebSocketServer();