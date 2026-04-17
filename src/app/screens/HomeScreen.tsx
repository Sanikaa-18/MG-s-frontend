import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  CalendarPlus,
  FileText,
  MapPin,
  Bell,
  User,
  ChevronRight,
  Activity,
  Users,
  LogOut,
  UserCog
} from "lucide-react";

import { clsx } from "clsx";

export function HomeScreen() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

useEffect(() => {
  const savedRole = localStorage.getItem("userRole");
  setRole(savedRole);
}, []);
  const isDoctor = role === "doctor";
if (role === null) return null; // or loading screen

  const patientActions = [
    { id: "book", title: "Book", icon: CalendarPlus, color: "bg-teal-50 text-teal-600", path: "/book" },
    { id: "clinics", title: "Clinics", icon: MapPin, color: "bg-emerald-50 text-emerald-600", path: "/branches" },
    { id: "alerts", title: "Alerts", icon: Bell, color: "bg-orange-50 text-orange-600", path: "/notifications" },
    { id: "health", title: "Health", icon: Activity, color: "bg-indigo-50 text-indigo-600", path: "/dashboard" }
  ];

  const doctorActions = [
    { id: "records", title: "Patients", icon: Users, color: "bg-indigo-50 text-indigo-600", path: "/history" },
    { id: "schedule", title: "Schedule", icon: CalendarPlus, color: "bg-teal-50 text-teal-600", path: "/book" },
    { id: "clinics", title: "Clinics", icon: MapPin, color: "bg-emerald-50 text-emerald-600", path: "/branches" },
    { id: "alerts", title: "Alerts", icon: Bell, color: "bg-orange-50 text-orange-600", path: "/notifications" }
  ];

  const quickActions = isDoctor ? doctorActions : patientActions;

  return (
    <div className="min-h-screen flex justify-center bg-black">
      
      {/* 📱 MOBILE FRAME */}
      <div className="w-full max-w-[420px] min-h-screen bg-slate-50 relative pb-24 overflow-hidden">

        {/* HEADER */}
        <div className="bg-teal-600 pt-12 pb-20 px-5 rounded-b-[2.5rem] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-teal-100 text-xs">Good Morning</p>
              <h1 className="text-xl font-bold text-white">
                {isDoctor ? "Dr. M.G. Sharma" : "Rajesh Kumar"}
              </h1>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white rounded-2xl p-2 shadow-lg min-w-[180px] z-50">

                  <DropdownMenu.Item
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded-xl"
                    onSelect={() => navigate("/profile")}
                  >
                    <UserCog className="w-4 h-4" />
                    Profile
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-slate-200 my-1" />

                  <DropdownMenu.Item
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl"
                    onSelect={() => {
                      localStorage.removeItem("userRole");
                      navigate("/");
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenu.Item>

                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        {/* CONTENT */}
        <div className="-mt-14 px-4 space-y-5 relative z-10">

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-4 shadow"
          >
            <h2 className="text-sm font-bold mb-3">
              {isDoctor ? "Next Patient" : "Upcoming Appointment"}
            </h2>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <CalendarPlus className="w-5 h-5 text-teal-600" />
              </div>

              <div>
                <p className="font-semibold text-sm">
                  {isDoctor ? "Patient Visit" : "Dr Appointment"}
                </p>
                <p className="text-xs text-slate-500">Today • 11:00 AM</p>
              </div>
            </div>
          </motion.div>

          {/* QUICK ACTIONS */}
          <div>
            <h2 className="text-sm font-bold mb-3 px-1">Quick Actions</h2>

            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((item, i) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center", item.color)}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">
                    {item.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* BOTTOM CARD */}
          {!isDoctor ? (
            <div className="bg-white rounded-3xl overflow-hidden shadow">
              <img
                src="https://images.unsplash.com/photo-1709813610121-e2a51545e212"
                className="h-28 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-sm">Find Specialist</h3>
                <p className="text-xs text-slate-500">Book your consultation</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-4 shadow">
              <h3 className="font-bold text-sm mb-3">Today</h3>

              <div className="flex justify-between text-sm">
                <span>Total Patients</span>
                <span className="font-bold">24</span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span>Remaining</span>
                <span className="font-bold text-teal-600">8</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}