import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/reset-password", { token, newPassword });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 
