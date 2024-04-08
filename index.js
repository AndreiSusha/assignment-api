const express = require("express");
const app = express();
let products = require("./data/products");
// now we can get json data from the client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logTime = (req, res, next) => {
  const date = new Date();
  console.log(date);
  next();
};
app.use(logTime);

// Route to get all the products
// localhost:8000 /api/products GET method
app.get("/api/products/", (req, res) => {
  res.status(200).json(products);
});

// Set the port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// GET
// localhost:8000 /api/products/3

app.get("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  const product = products.find((product) => product.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      msg: "Not found",
    });
  }
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((product) => product.id == id);
  if (product == undefined) {
    res.status(404).json({ message: "Product not found" });
    return;
  } else {
    products = products.filter((product) => product.id != id);
    res.status(200).json({ message: "Product deleted" });
  }
});

// CREATE
app.post("/api/products", (req, res) => {
  const lastId = products[products.length - 1].id;
  const newId = lastId + 1;

  newProduct = {
    id: newId,
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  };

  products.push(newProduct);

  res
    .status(201)
    .json({ msg: "The product has been added successfully!", newProduct });
  res.location("http://localhost:8000/api/products/" + newId);
  res.status(201).json(newProduct);
});

// UPDATE
app.patch("/api/products/:id", (req, res) => {
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
    res.status(404).json({ msg: "Could not find the product" });
  }
});
