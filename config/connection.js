const mongoose = require('mongoose');

// allows Mongoose to interact with the  local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/echoChamber', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;