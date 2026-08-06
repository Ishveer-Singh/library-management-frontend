import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import AuthLayout from "../components/AuthLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (

    <AuthLayout>

    <Card className="w-full max-w-lg shadow-xl">

      <h2 className="text-3xl font-bold text-gray-900">
        Create Account
      </h2>

      <p className="text-gray-500 mt-2 mb-6">
        Join BookSphere today.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Register
        </Button>

      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-indigo-600 font-medium cursor-pointer hover:text-indigo-700"
        >
          Login
        </span>
      </p>

    </Card>

  </AuthLayout>

  )
}

export default Register;