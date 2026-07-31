import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData)

    localStorage.setItem("token", response.data.data.token);
    login(response.data.data.user);

    navigate("/");

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div>
     
     <form onSubmit={handleLogin}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

    </div>

  );
}

export default Login;
