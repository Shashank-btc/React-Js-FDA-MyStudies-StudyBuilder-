const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  // _id: { type: String, required: true }, // Specify _id as a string
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const ExampleModel = mongoose.model('Example', exampleSchema);

module.exports = ExampleModel;
