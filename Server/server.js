const express = require("express");
const app = express();
const port = 8181;
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// GET method , i just want to see all the product inside the fs , so i need to  read the file
app.get("/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  res.send(products);
  // i send response to the client side with the products
});
// POST method  , i want to get the data from the product client , so i will recive them on the req-body
app.post("/products", (req, res) => {
  const { id, name, price } = req.body; // take the product form the request
  console.log(req.body);

  const products = JSON.parse(fs.readFileSync("../database/product.json")); // now here i want to read the data from the fs
  products.push({ id: id, name: name, price: price }); // push the new values fro  the client to the products datbase i have

  fs.writeFileSync("../database/product.json", JSON.stringify(products)); // and then please write it to the file system
  res.send(products); // send to the client , the products
});
// DELETE  in delete i will take the id from the parames
app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  // read the fs
  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  // i need to find the product from the fs that have the same id that i choose from the client side
  const deletedProduct = products.find((product) => product.id === productId);
  // if theres no product
  if (!deletedProduct) {
    res.status(404).send("Product not found");
    return;
  }
  // here i want to return array witout the product that deleted
  const filteredProducts = products.filter(
    (product) => product.id !== productId
  );
  // write it to the fs
  fs.writeFileSync(
    "../database/product.json",
    JSON.stringify(filteredProducts)
  );
  res.send(deletedProduct);
  // const deletedUser = products.pop();
  // fs.writeFileSync("../database/product.json", JSON.stringify(products));
  // res.send(deletedUser);
});

// UPDATE method
app.put("/products/:id", (req, res) => {
  const productId = req.params.id; // take the id from the params
  const products = JSON.parse(fs.readFileSync("../database/product.json")); // read the fs
  const FindProduct = products.findIndex((product) => product.id === productId); // findindex the product
  if (FindProduct !== -1) {
    // if theres a product
    const productToUpdate = products[FindProduct]; // here i take a varible with the all data to the product
    const updatedProduct = {
      // i want to update it
      ...productToUpdate, // spread the original product to retain its properties // the prv data taked
      ...req.body, // update the product with the new values // the new values from the client
    };
    products[FindProduct] = updatedProduct; // save the updated product to the product
    fs.writeFileSync("../database/product.json", JSON.stringify(products)); // write it to the fs

    res.status(200).send(products);
  } else {
    res.status(404).send("Product not found");
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
