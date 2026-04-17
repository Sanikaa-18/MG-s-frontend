import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, Sparkles, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

export function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleReset = async () => {
    if (!password) {
      setError("Enter password");
      triggerShake();
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Error");
        triggerShake();
        return;
      }

      setSuccess("Password updated successfully 🎉");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch {
      setLoading(false);
      setError("Server error");
      triggerShake();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 px-4 relative overflow-hidden">

      {/* background blobs */}
      <div className="absolute w-72 h-72 bg-green-400 blur-3xl rounded-full top-[-80px] left-[-80px] opacity-30 animate-pulse" />
      <div className="absolute w-72 h-72 bg-emerald-500 blur-3xl rounded-full bottom-[-80px] right-[-80px] opacity-30 animate-pulse" />

      {/* CARD */}
      <div
        className={clsx(
          "w-full max-w-sm bg-white/80 backdrop-blur-xl border border-green-100 rounded-3xl shadow-2xl p-6 transition-all",
          shake && "animate-[shake_0.4s]"
        )}
      >

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
            <Lock className="text-white" />
          </div>

          <h1 className="text-2xl font-bold text-green-800 mt-3">
            Reset Password
          </h1>

          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Sparkles className="w-3 h-3" />
            Create a strong new password
          </p>
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

        {/* INPUT */}
        <input
          className="w-full p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 outline-none transition mb-4"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleReset}
          disabled={loading}
          className={clsx(
            "w-full py-3 rounded-xl text-white font-semibold transition-all active:scale-95 shadow-md",
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          )}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-green-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>
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