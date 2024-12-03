const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/yourdbname'; // Update with your actual database name

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));
