"use client"
import React, { useState } from "react";
import Link from "next/link";
import "./Auth.css";
import { BASE_URL } from "@/apis/api";

const Login = () => {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    // const router = useRouter()

  // serverError will hold the error message from the server
  const [serverError, setServerError] = useState("");

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the server error as soon as the user starts typing in either field
    if (serverError) {
      setServerError("");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });

      const data = await response.json();
      if (data.error) {
        // If there's an error, set the serverError message
        setServerError(data.error);
      } else {
        // On success, navigate to home or any other protected route
       location.replace("/")
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  // If there's an error, we'll add "input-error" class to both fields
  const hasError = Boolean(serverError);

  return (
    <div className="max-w-[400px] my-[50px] mx-auto p-[20px]">
      <h2 className="text-4xl text-center p-4 font-bold  ">Login</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="relative mb-[20px]">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className={`input ${hasError ? "input-error" : ""}`}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className={`input ${hasError ? "input-error" : ""}`}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {/* Absolutely-positioned error message below password field */}
          {serverError && <span className="error-msg">{serverError}</span>}
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

      {/* Link to the register page */}
      <p className="link-text">
        Don't have an account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;