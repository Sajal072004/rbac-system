/* eslint-disable react/no-unescaped-entities */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const requestBody = {
        email,
        password,
        name,
        
        ...(isAdmin && { roleId: 1 }),
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody), 
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.user.id);
        router.push("/dashboard");
      } else {
        setError(data.error || "Signup failed. Please try again.");
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

        {/* Signup Form */}
        <div className="relative z-10 flex justify-center items-center flex-grow">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 bg-opacity-90">
            <h2 className="text-xl font-bold mb-6">Sign Up</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mb-4 text-black"
            />
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

            {/* Admin Signup Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="admin" className="text-white">
                Sign up as Admin
              </label>
            </div>

            <Button onClick={handleSignup} className="w-full">
              Sign Up
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => router.push("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
