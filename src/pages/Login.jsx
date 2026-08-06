import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

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

    <AuthLayout>

      <Card className="w-full max-w-lg shadow-xl">

        <h2 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>

        <p className="text-gray-500 mt-2 mb-6">
          Login to continue to BookSphere
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full">
            Login
          </Button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:text-indigo-700"
          >
            Register
          </span>
        </p>

      </Card>

    </AuthLayout>

  );
}

export default Login;
