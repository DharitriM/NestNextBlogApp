"use client";

import { login } from "@/api/auth";
import { addUser } from "@/api/users";
import { useState } from "react";

export default function LoginRegisterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const response = await login({
      email: formData.email,
      password: formData.password,
    });
    if (response?.access_token) {
      localStorage.setItem("authToken", response?.access_token);
      localStorage.setItem("tokenExpiration", response?.expires_at);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      onClose();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async () => {
    const response = await addUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setIsRegister(false);
  };

  const handleSubmit = async () => {
    if (isRegister) {
      // Add register API logic here
      await handleRegister();
    } else {
      console.log("Login Data:", {
        email: formData.email,
        password: formData.password,
      });
      // Add login API logic here
      await handleLogin();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-slate-700 w-full max-w-md rounded-lg p-6 shadow-lg">
          <div>
            <div className="flex justify-end">
              <button
                onClick={() => onClose()}
                className="text-gray-500 hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {isRegister ? "Register" : "Login"}
            </h2>
            <form className="flex flex-col gap-4">
              {isRegister && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isRegister && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="p-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-30 mx-auto px-4 py-2 bg-slate-900 text-white rounded-md shadow hover:bg-blue-500"
              >
                {isRegister ? "Sign Up" : "Login"}
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                onClick={() => setIsRegister(!isRegister)}
                className="text-slate-400 cursor-pointer hover:underline"
              >
                {isRegister ? "Login" : "Register"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
