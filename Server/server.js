const express = require("express");
const app = express();
const port = 8181;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/api/my-endpoint", (req, res) => {
  console.log("get record ");
  const message = req.body.message;
  console.log(message); // "Hello server!"
  res.end("Thanks for your message!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
