import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, AlertCircle, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

export function AuthScreen() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"patient" | "doctor">("patient");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        triggerShake();
        return;
      }

      if (!isLogin) {
        setSuccess("Account created successfully 🌿");
        setTimeout(() => setIsLogin(true), 1200);
        return;
      }

      setSuccess("Welcome back 🌿");

      localStorage.setItem("userRole", data.role);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch {
      setLoading(false);
      setError("Server not reachable");
      triggerShake();
    }
  };

  // ✅ FIXED FORGOT PASSWORD (ONLY THIS PART CHANGED)
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter email first");
      triggerShake();
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Failed to send reset link");
        triggerShake();
        return;
      }

      setSuccess("Reset link sent 📩 Check your email");
      setForgotMode(false);

    } catch {
      setLoading(false);
      setError("Server not reachable");
      triggerShake();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaffea] relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[280px] h-[280px] bg-green-300 blur-3xl rounded-full top-[-100px] left-[-80px] opacity-40 animate-pulse" />
      <div className="absolute w-[260px] h-[260px] bg-green-500 blur-3xl rounded-full bottom-[-90px] right-[-80px] opacity-30 animate-pulse" />

      {/* MOBILE FRAME */}
      <div className="w-full max-w-sm px-5">

        {/* CARD */}
        <div
          className={clsx(
            "bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl border border-green-100 transition-all",
            shake && "animate-[shake_0.4s]"
          )}
        >

          {/* HEADER */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HeartPulse className="text-white" />
            </div>
            <h1 className="text-xl font-bold mt-3 text-green-800">
              MG Homeocare
            </h1>
            <p className="text-xs text-gray-500">
              Healing with nature 🌿
            </p>
          </div>

          {/* ROLE */}
          <div className="flex bg-green-100 p-1 rounded-xl mb-4">
            <button
              onClick={() => setRole("patient")}
              className={clsx(
                "flex-1 py-2 rounded-lg text-sm transition",
                role === "patient" && "bg-white text-green-700 shadow"
              )}
            >
              Patient
            </button>

            <button
              onClick={() => setRole("doctor")}
              className={clsx(
                "flex-1 py-2 rounded-lg text-sm transition",
                role === "doctor" && "bg-white text-green-700 shadow"
              )}
            >
              Doctor
            </button>
          </div>

          {/* LOGIN/SIGNUP */}
          <div className="flex mb-3">
            <button
              onClick={() => setIsLogin(true)}
              className={clsx(
                "flex-1 py-2 text-sm",
                isLogin && "font-bold text-green-700"
              )}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={clsx(
                "flex-1 py-2 text-sm",
                !isLogin && "font-bold text-green-700"
              )}
            >
              Signup
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-2 rounded-xl mb-3 text-xs animate-pulse">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-2 rounded-xl mb-3 text-xs animate-bounce">
              <CheckCircle className="w-4 h-4" />
              {success}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <input
              className="p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <input
              className="p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-xl active:scale-95 transition flex items-center justify-center"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
            </button>
          </form>

          {/* FORGOT */}
          {isLogin && (
            <button
              type="button"
              onClick={() => setForgotMode(true)}
              className="text-xs text-green-700 mt-3"
            >
              Forgot password?
            </button>
          )}

          {forgotMode && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg active:scale-95 transition"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="text-xs text-red-500 mt-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* shake animation */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}