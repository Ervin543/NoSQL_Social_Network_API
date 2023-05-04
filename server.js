const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected!');
});

// Import routes
const thoughtRoutes = require('./routes/api/thought-routes');
const userRoutes = require('./routes/api/user-routes');
const friendRoutes = require('./routes/api/friend-routes');

// Add routes
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

// Default 404 route
app.use((req, res) => {
  res.status(404).send('<h1>404 Error</h1><p>Page not found!</p>');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
