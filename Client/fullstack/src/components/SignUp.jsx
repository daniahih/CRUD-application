export default function SignUp() {
  const values = {};
  function handleInput(type, e) {
    values[type] = e.target.value;
  }
  function handleSubmit(e, type) {
    e.preventDefault();
    if (values.userName && values.password) {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      fetch(`http://localhost:8181/${type}`, {
        headers,
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
        });
    }
  }
  return (
    <>
      <h1> SIGN UP </h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event, "signup");
        }}
      >
        <label> Username </label>
        <input
          type="text"
          onInput={(e) => {
            handleInput("userName", e);
          }}
        />
        <label> Password </label>
        <input
          type="password"
          onInput={(event) => {
            handleInput("password", event);
          }}
        />
      </form>
    </>
  );
}
