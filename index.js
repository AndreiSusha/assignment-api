const express = require('express');
const app = express();
// now we can get json data from th eclient
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logTime = (req, res, next) => {
  const date = new Date();
  console.log(date);
  next();
};
app.use(logTime);

// IRL we could connect to the database
// But here we will use array of JS objects

let products = [
  { id: 1, name: 'chair', price: 140 },
  { id: 2, name: 'table', price: 200 },
  { id: 3, name: 'closet', price: 400 },
];

// Route to get all the products
// localhost:8000 /api/products GET method
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Set the port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Get on product based on ID
// localhost:8000 /api/products/3

app.get('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);

  // const car = cars.find(car => car.id == id)
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      msg: 'Not found',
    });
  }
});

// DELETE
app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((product) => product.id == id);
  if (product == undefined) {
    res.status(404).json({ message: 'Product not found' });
    return;
  } else {
    products = products.filter((product) => product.id != id);
    res.status(200).json({ message: 'Product deleted' });
  }
});

// Create
app.post('/api/products', (req, res) => {
  //   console.log(req.body);
  //   res.send('Ok');
  const lastId = products[products.length - 1].id;
  const newId = lastId + 1;

  //res.send('Ok');

  newProduct = {
    id: newId,
    namme: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);

  res
    .status(201)
    .json({ msg: 'The product hase been added successfully!', newProduct });
  res.location('http://localhost:8000/api/products/' + newId);
  res.status(201).json(newProduct);
});

// Update
app.patch('/api/products/:id', (req, res) => {
  const idToUpdate = Number(req.params.id);
  const newName = req.body.name;
  const newPrice = req.body.price;

  products.forEach((product) => {
    if (product.id === idToUpdate) {
      product.name = newName;
      product.price = newPrice;
    }
  });

  const product = products.find((product) => product.id === idToUpdate);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ msg: 'Could not find the product' });
  }
});
