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

app.delete("/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync("../database/product.json"));
  const deletedUser = products.shift();
  fs.writeFileSync("../database/product.json", JSON.stringify(products));
  res.send(deletedUser);
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
