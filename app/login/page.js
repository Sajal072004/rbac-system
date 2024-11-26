"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Store the auth token (JWT or similar) in localStorage or cookie
        localStorage.setItem("authToken", data.token);
        localStorage.setItem('userId', data.user.id);
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      {/* Background Mask */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full flex flex-wrap justify-between items-center p-4 sm:p-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center sm:text-left w-full sm:w-auto">
            Welcome to RoleAccess
          </h1>
          <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-blue-500 transition-all shadow-lg"
              onClick={() => router.push("/")}>
              Homepage
            </button>
          </div>
        </header>

        {/* Login Form */}
        <div className="relative z-10 flex justify-center items-center flex-grow">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 bg-opacity-90">
            <h2 className="text-xl font-bold mb-6">Login</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-4 text-black"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mb-4 text-black"
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>

            {/* Sign up Link */}
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => router.push("/signup")}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
