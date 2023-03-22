import { useState } from "react";
export default function Buttons() {
  const [productid, setProductid] = useState("");
  const [productName, setProductName] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productData, setProductData] = useState(null);
  const handleClick = () => {
    fetch("http://localhost:8181/products")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setProductData(res);
      });
  };

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
  const handelAdd = () => {
    const product = { id: productid, name: productName, price: productprice };
    console.log("client", product);
    fetch("http://localhost:8181/products", {
      method: "POST",
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
  const handdleDelete = async () => {
    await fetch(`http://localhost:8181/products/${productid}`, {
      method: "DELETE",
    });
  };
  const handelUpdate = () => {
    // const product = { id: productid, name: productName, price: productprice };
    let product = { id: productid };
    if (productprice !== "") {
      product = Object.assign(product, { price: productprice });
    }
    if (productName !== "") {
      product = Object.assign(product, { name: productName });
    }
    // } else {
    //   product = { id: productid, name: productName, price: productprice };
    // }
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
