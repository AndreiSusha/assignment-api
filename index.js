const express = require('express');
const app = express();

// IRL we could connect to the database
// But here we will use array of JS objects

let products = [
  { id: 1, name: 'chair', price: 140 },
  { id: 2, name: 'table', price: 200 },
  { id: 3, name: 'closet', price: 400 },
];

// Route to get all the products

app.get('/api/products', (req, res) => {
  res.json(products);
});

// Set the port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
