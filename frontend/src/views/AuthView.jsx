// src/views/AuthView.jsx
import React, { useState, useContext } from "react";
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { Mail, Lock, User } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext.jsx";

// replace MockAPI usage with real API functions
import { loginUser, registerUser } from "../api/index.js";

const AuthView = () => {
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const email = String(formData.email || "").trim();
    const password = String(formData.password || "");
    if (!email.includes("@")) newErrors.email = "Invalid email address";
    if (password.length < 6) newErrors.password = "Password must be at least 6 chars";
    if (!isLogin && !String(formData.name || "").trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setLoading(true);
    try {
      if (isLogin) {
        // call backend login
        const res = await loginUser(formData.email.trim(), formData.password);
        // expected shape: { token, user: { id, username } }
        const token = res?.data?.token;
        const userObj = res?.data?.user;
        if (!token || !userObj) throw new Error("Invalid response from server");
        const user = {
          id: userObj.id || userObj._id || userObj.userId,
          name: userObj.username || userObj.name || userObj.email,
          token,
        };
        login(user); // store in context & localStorage via AuthContext
      } else {
        // register
        const res = await registerUser(formData.name.trim(), formData.email.trim(), formData.password);
        const token = res?.data?.token;
        const userObj = res?.data?.user;
        if (!token || !userObj) throw new Error("Invalid response from server");
        const user = {
          id: userObj.id || userObj._id || userObj.userId,
          name: userObj.username || userObj.name || userObj.email,
          token,
        };
        login(user); // auto-login after signup
      }
    } catch (err) {
      // Axios errors often have response.data.message
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "An error occurred";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">TaskFlow</h1>
          <p className="text-blue-100">Manage your tasks efficiently</p>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setApiError("");
                setErrors({});
              }}
              className={`flex-1 pb-2 text-center font-medium border-b-2 transition-colors ${
                isLogin ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setApiError("");
                setErrors({});
              }}
              className={`flex-1 pb-2 text-center font-medium border-b-2 transition-colors ${
                !isLogin ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <span className="font-bold">Error:</span> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <InputField
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={User}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />
            )}

            <InputField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />

            <Button fullWidth isLoading={loading} onClick={handleSubmit} disabled={loading}>
              {isLogin ? "Login to Dashboard" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            For demo: create a real account or use your own credentials.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
