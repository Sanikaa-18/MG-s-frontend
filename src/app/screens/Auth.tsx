import { useState } from "react";
import { useNavigate } from "react-router";
import { HeartPulse, Mail, Lock, Smartphone, ArrowRight, UserSquare2, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";

export function AuthScreen() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [role, setRole] = useState<"patient" | "doctor">("patient");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-teal-50 rounded-[100%] z-0 shadow-[0_0_100px_rgba(20,184,166,0.1)]" />

      <div className="relative z-10 flex flex-col items-center pt-16 pb-8 px-6 flex-1 overflow-y-auto">
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-20 h-20 bg-teal-600 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-200 rotate-12 mb-6">
            <HeartPulse className="w-10 h-10 text-white -rotate-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">MG's Homeocare</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Holistic Healing, Naturally</p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="w-full max-w-sm flex flex-col flex-1"
        >
          {/* Role Selection */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={clsx(
                "flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2",
                role === "patient" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <UserSquare2 className="w-4 h-4" /> Patient
            </button>
            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={clsx(
                "flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2",
                role === "doctor" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Stethoscope className="w-4 h-4" /> Doctor
            </button>
          </div>

          <div className="flex justify-between items-center mb-6 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={clsx(
                "flex-1 py-3 text-sm font-semibold transition-all relative",
                isLogin ? "text-teal-700" : "text-slate-400"
              )}
            >
              Log In
              {isLogin && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-t-full" />}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={clsx(
                "flex-1 py-3 text-sm font-semibold transition-all relative",
                !isLogin ? "text-teal-700" : "text-slate-400"
              )}
            >
              Sign Up
              {!isLogin && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-t-full" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isLogin && (
              <div className="flex gap-2 mb-1">
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={clsx(
                    "flex-1 py-2 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-2 border transition-colors",
                    loginMethod === "email" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-white border-slate-200 text-slate-500"
                  )}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={clsx(
                    "flex-1 py-2 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-2 border transition-colors",
                    loginMethod === "phone" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-white border-slate-200 text-slate-500"
                  )}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Phone
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <UserSquare2 className="w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                {loginMethod === "email" && isLogin ? (
                  <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                ) : (
                  <Smartphone className="w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                )}
              </div>
              <input
                type={loginMethod === "email" && isLogin ? "email" : "tel"}
                placeholder={loginMethod === "email" && isLogin ? "Email Address" : "Phone Number"}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              </div>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-teal-200"
            >
              {isLogin ? `Sign In as ${role === "doctor" ? "Doctor" : "Patient"}` : "Create Account"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-auto pt-6 pb-4 text-center text-xs text-slate-500">
            By continuing, you agree to our <br />
            <a href="#" className="font-medium text-teal-600">Terms of Service</a> and <a href="#" className="font-medium text-teal-600">Privacy Policy</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
