import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {

  console.log("Login component rendered");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {

    const response = await loginUser({
      email: "",
      password: "",
    });

    localStorage.setItem("token", response.data.data.token);
    login(response.data.data.user);

    console.log(response.data);
    console.log(response.data.data.user);
  };

  return (
    <div>
      <button style={{
        background: "blue",
        color: "white",
        padding: "10px 20px",
      }} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
