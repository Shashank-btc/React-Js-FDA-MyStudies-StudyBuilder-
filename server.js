const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/react_mongo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
const examplesRouter = require('./routes/examples');
app.use('/api', examplesRouter);

// Server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
