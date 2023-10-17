const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Marketplace', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Marketplace App!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

