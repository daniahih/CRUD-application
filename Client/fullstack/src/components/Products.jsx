import { useState } from "react";
export default function Products() {
  const [productid, setProductid] = useState("");
  const [productName, setProductName] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productData, setProductData] = useState(null);
  // handel click to see the product to here i do a get method and get all the data form the database
  const handleClick = () => {
    fetch("http://localhost:8181/products") // why i dont set get , becouse on defult i have a get method
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setProductData(res); // here i want to se the product inside the jsx so i save it to the state
      });
  };
  // this for  take any hange in the input , so here iam store the value from the input
  const handleChange = (e) => {
    console.log(e.target.value);
    setProductName(e.target.value);
  };
  const handleChangeid = (e) => {
    setProductid(e.target.value);
  };
  const handleChangeprice = (e) => {
    setProductprice(e.target.value);
  };

  // POST method to add , i made a 3 input name , price and id , so i do three state and every state store the value
  // store the value to object to send it with body to the server
  const handelAdd = () => {
    const product = { id: productid, name: productName, price: productprice };
    console.log("client", product);
    fetch("http://localhost:8181/products", {
      method: "POST",
      body: JSON.stringify(product), // json product send with request to the server
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
      });
  };

  // DELETE method
  // on delete method i need to the id  so i send the id with the url
  const handdleDelete = async () => {
    await fetch(`http://localhost:8181/products/${productid}`, {
      method: "DELETE",
    });
  };
  // PUT mehtod to update

  const handelUpdate = () => {
    // here i dont want to change on id so i store it at the object
    let product = { id: productid };
    // if i have a price , so make the price inside the object
    if (productprice !== "") {
      product = Object.assign(product, { price: productprice });
      // so here i will send id and price
    }
    // if i have a name  , so make the name  inside the object
    if (productName !== "") {
      product = Object.assign(product, { name: productName });
      // so here i will send id and name in the request
    }
    // to update i need the id , so i send it with the url

    fetch(`http://localhost:8181/products/${productid}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
      });
  };

  return (
    <>
      <h1> connect the react app to the server </h1>
      <button onClick={handleClick}>See Product</button>
      <input
        type="text"
        value={productid}
        onChange={handleChangeid}
        placeholder="id"
      ></input>
      <input
        type="text"
        value={productName}
        onChange={handleChange}
        placeholder="name"
      />
      <input
        type="text"
        value={productprice}
        onChange={handleChangeprice}
        placeholder="price"
      />

      <button onClick={handelAdd}> add </button>
      <button onClick={handdleDelete}>Delete</button>
      <button onClick={handelUpdate}> Update </button>
      {/* 
      here i just see the product in the jsx using map and state  */}
      {productData &&
        productData.map((product) => (
          <div key={product.id}>
            <p>ID: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
    </>
  );
}
