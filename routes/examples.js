const express = require('express');
const router = express.Router();
const ExampleModel = require('../modules/example');
const e = require('cors');

// Create
router.post('/examples', async (req, res) => {
  try {
    const { name, age } = req.body;

    // Validate input
    if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }

    // Create a new example
    const example = new ExampleModel({ name, age });
    await example.save();

    // Respond with the created example
    res.status(201).json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET 
router.get('/examples', async (req, res) => {
  try {
    const examples = await ExampleModel.find();
    res.json(examples);
  } catch (error) {
    console.error('Error fetching examples:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update
router.put('/examples/:id', async (req, res) => {
  // console.log("request body ",req.body)
  // console.log("request body name ",req.body.name)
  // console.log("request body id ",req.params.id)
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedExample = await ExampleModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });

    if (!updatedExample) {
      return res.status(404).json({ error: 'Example not found' });
    }

    res.json(updatedExample);
  } catch (error) {
    console.error('Error updating example by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete
router.delete('/examples/:id', async (req, res) => {
  try {
    await ExampleModel.findByIdAndDelete({_id : req.params.id});
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
});

// Get example by ID
router.get('/examples/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received request for ID:', id);

  const { queryParam1, queryParam2 } = req.query; // Access query parameters

  console.log('Received query parameters:', req.query);

  try {
    // Find the example by ID
    const example = await ExampleModel.findById({_id : req.params.id});

    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }

    res.json(example);
  } catch (error) {
    console.error('Error fetching example by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
