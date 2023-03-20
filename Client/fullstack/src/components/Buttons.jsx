export default function Buttons() {
  const handleClick = () => {
    fetch("http://localhost:8181/api/my-endpoint", {
      method: "POST",
      body: JSON.stringify({ message: "Hello server!" }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("res", res);
    });
  };
  return (
    <>
      <h1> connect the react app to the server </h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}
