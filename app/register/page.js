"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Auth.css";
import { BASE_URL } from "@/apis/api";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });
  const router = useRouter()

  // serverError will hold the error message from the server
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // otp states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the server error as soon as the user starts typing in Email
    if (name === "email" && serverError) {
      setServerError("");
      setOtpError("");
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Send OTP handler
  const handleSendOtp = async () => {
    const { email } = formData;
    if (!email) {
      setOtpError("Please enter your email first.");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setCountdown(60); // allow resend after 60s
        setOtpError("");
      } else {
        setOtpError(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong sending OTP.");
    } finally {
      setIsSending(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async () => {
    const { email, otp } = formData;
    if (!formData.otp) {
      setOtpError("Please enter OTP.");
      return;
    }

    try {
      setIsVerifying(true);
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        setOtpVerified(true);
        setCountdown(0);
        setOtpError("");
      } else {
        setOtpError(data.error || "Invalid or expired OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong verifying OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false); // reset success if any
    if (!otpVerified) {
      setOtpError("Please verify your email with OTP before registering.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error && typeof (data.error === "object" && data.error !== null)) {

        if (data.error.password) {
          setServerError(data.error.password[0]);
        }
        else if (data.error.name) {
          setServerError(data.error.name[0]);
        }
        else if (data.error.email) {
          setServerError(data.error.email[0]);
        }
        else if (data.error.otp) {
          setServerError(data.error.otp[0]);
        }
        return 
      }

      else if (data.error) {
        // Show error below the email field (e.g., "Email already exists")
        setServerError(data.error);
        return
      }
      // Registration success
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      // In case fetch fails
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-[400px] my-[50px] mx-auto p-[20px]">
      <h2 className="text-4xl text-center p-4 font-bold  ">Register</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email + Send OTP */}
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <div className="otp-wrapper">
            <input
              className={`input ${serverError ? "input-error" : ""}`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <button
              type="button"
              className="otp-button"
              onClick={handleSendOtp}
              disabled={isSending || countdown > 0 || otpVerified}
            >
              {isSending
                ? "Sending..."
                : countdown > 0
                  ? `${countdown}s`
                  : "Send OTP"}
            </button>
          </div>
          {serverError && <span className="error-msg">{serverError}</span>}
        </div>

        {/* OTP Input + Verify */}
        {otpSent && (
          <div className="form-group">
            <label htmlFor="otp" className="label">
              Enter OTP
            </label>
            <div className="otp-wrapper">
              <input
                className="input"
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="4-digit OTP"
                maxLength={4}
                required
              />
              <button
                type="button"
                className="otp-button"
                onClick={handleVerifyOtp}
                disabled={isVerifying || otpVerified}
              >
                {isVerifying
                  ? "Verifying..."
                  : otpVerified
                    ? "Verified"
                    : "Verify OTP"}
              </button>
            </div>
            {otpError && <span className="error-msg">{otpError}</span>}
          </div>
        )}

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            minLength={8}
            maxLength={12}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${isSuccess ? "success" : ""}`}
          disabled={!otpVerified || isSuccess}
        >
          {isSuccess ? "Registration Successful" : "Register"}
        </button>
      </form>

      {/* Link to the login page */}
      <p className="link-text">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
