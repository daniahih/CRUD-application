const express = require("express");
const app = express();
const port = 8181;
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.get("/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  res.send(products);
});
app.post("/products", (req, res) => {
  const { id, name, price } = req.body;
  console.log(req.body);

  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  products.push({ id: id, name: name, price: price });

  fs.writeFileSync("../database/product.json", JSON.stringify(products));
  res.send(products);
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  const deletedProduct = products.find((product) => product.id === productId);
  if (!deletedProduct) {
    res.status(404).send("Product not found");
    return;
  }
  const filteredProducts = products.filter(
    (product) => product.id !== productId
  );
  fs.writeFileSync(
    "../database/product.json",
    JSON.stringify(filteredProducts)
  );
  res.send(deletedProduct);
  // const deletedUser = products.pop();
  // fs.writeFileSync("../database/product.json", JSON.stringify(products));
  // res.send(deletedUser);
});
app.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  // const updatedProduct = req.body;
  // console.log("name name", updatedProduct.name);
  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  const FindProduct = products.findIndex((product) => product.id === productId);
  if (FindProduct !== -1) {
    // find products
    // if (!updatedProduct.name) {
    //   updatedProduct.name = FindProduct.name;
    //   console.log("daniahh");
    //   console.log("dania", FindProduct.name);
    // }
    // products[FindProduct] = updatedProduct;
    const productToUpdate = products[FindProduct];
    const updatedProduct = {
      ...productToUpdate, // spread the original product to retain its properties
      ...req.body, // update the product with the new values
    };
    products[FindProduct] = updatedProduct;
    fs.writeFileSync("../database/product.json", JSON.stringify(products));

    res.status(200).send(products);
  } else {
    res.status(404).send("Product not found");
  }
});

// app.post("/api/my-endpoint", (req, res) => {
//   console.log("get record ");
//   const message = req.body.message;
//   console.log(message); // "Hello server!"
//   res.end("Thanks for your message!");
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
