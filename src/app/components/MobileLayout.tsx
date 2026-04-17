import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, MapPin, CalendarPlus, FileText, Bell, Stethoscope, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";

export function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");

  useEffect(() => {
    // Check role whenever location changes or on mount
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, [location.pathname]);

  const patientNav = [
    { id: "home", icon: Home, label: "Home", path: "/dashboard" },
    { id: "book", icon: CalendarPlus, label: "Book Appt", path: "/book" },
    { id: "branches", icon: MapPin, label: "Clinics", path: "/branches" },
    { id: "alerts", icon: Bell, label: "Alerts", path: "/notifications" },
  ];

  const doctorNav = [
    { id: "home", icon: Home, label: "Home", path: "/dashboard" },
    { id: "history", icon: FileText, label: "Records", path: "/history" },
    { id: "branches", icon: MapPin, label: "Clinics", path: "/branches" },
    { id: "alerts", icon: Bell, label: "Alerts", path: "/notifications" },
  ];

  const navItems = role === "doctor" ? doctorNav : patientNav;

  // Hide nav on login screen
  const isAuthScreen = location.pathname === "/";

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 w-full sm:p-4 font-sans">
      <div className="relative w-full max-w-[400px] h-[100dvh] sm:h-[850px] sm:max-h-[100dvh] bg-slate-50 sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-neutral-800 sm:border-[8px]">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 overflow-x-hidden relative scroll-smooth pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-full flex flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        {!isAuthScreen && (
          <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-6 py-3 pb-safe z-50 rounded-b-[2rem]">
            <div className="flex justify-between items-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname.startsWith('/dashboard'));
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center gap-1 p-2 focus:outline-none tap-highlight-transparent relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-teal-50 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <item.icon
                      size={24}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={clsx(
                        "relative z-10 transition-colors duration-200",
                        isActive ? "text-teal-600" : "text-slate-400"
                      )}
                    />
                    <span
                      className={clsx(
                        "text-[10px] relative z-10 font-medium transition-colors duration-200",
                        isActive ? "text-teal-700" : "text-slate-500"
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
