export default function SignUp() {
  const values = {};
  function handleInput(type, e) {
    values[type] = e.target.value;
  }
  return (
    <>
      <h1> SIGN UP </h1>
      <form>
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
