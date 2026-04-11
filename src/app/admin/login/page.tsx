"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../Services/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fix: Change from React.SubmitEvent to React.FormEvent
    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("https://zenvirox.tech/admin/login", {
        email,
        password
      }); 

      const token = res.data.AccessToken;
      
      // ❌ Remove this - middleware can't read it
      // localStorage.setItem("adminToken", token);
      
      // ✅ Set cookie instead (so middleware can read it)
      document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Strict`;
      
      console.log("Cookie set, redirecting to dashboard");
      router.push("/admin/dashboard");

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35928d]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35928d]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#35928d] text-white py-2 rounded-lg hover:bg-[#2b7a75] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}