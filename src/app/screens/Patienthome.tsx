import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  CalendarPlus,
  Bell,
  User,
  MapPin,
  LogOut,
  UserCog,
  MessageCircle,
} from "lucide-react";
import { clsx } from "clsx";

export function PatientHome() {
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole") || "";

  useEffect(() => {
    if (!role) navigate("/");
  }, [navigate, role]);

  if (!role) return null;

  const patientActions = [
    {
      id: "book",
      title: "Book",
      icon: CalendarPlus,
      color: "bg-teal-50 text-teal-600",
      path: "/book",
    },
    {
      id: "messages",
      title: "Messages",
      icon: MessageCircle,
      color: "bg-indigo-50 text-indigo-600",
      path: "/branches",
    },
    {
      id: "branches",
      title: "Branches",
      icon: MapPin,
      color: "bg-emerald-50 text-emerald-600",
      path: "/branches",
    },
    {
      id: "alerts",
      title: "Notifications",
      icon: Bell,
      color: "bg-orange-50 text-orange-600",
      path: "/notifications",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center bg-black">
      <div className="w-full max-w-[420px] min-h-screen bg-slate-50 pb-24">

        {/* HEADER */}
        <div className="bg-teal-600 pt-12 pb-20 px-5 rounded-b-[2.5rem] relative overflow-hidden">

          <div className="flex justify-between items-center">
            <div>
              <p className="text-teal-100 text-xs">Good Morning</p>
              <h1 className="text-xl font-bold text-white">
                Patient Dashboard
              </h1>
              <p className="text-[10px] text-white/70">
                Patient Panel
              </p>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="bg-white rounded-2xl p-2 shadow-lg min-w-[180px] z-50">

                <DropdownMenu.Item
                  onSelect={() => navigate("/profile")}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  <UserCog className="w-4 h-4" />
                  Profile
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="h-px bg-slate-200 my-1" />

                <DropdownMenu.Item
                  onSelect={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenu.Item>

              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>

        {/* CONTENT */}
        <div className="-mt-14 px-4 space-y-5">

          {/* CARD */}
          <motion.div className="bg-white rounded-3xl p-4 shadow">
            <h2 className="text-sm font-bold mb-3">
              Upcoming Appointment
            </h2>
            <p className="text-xs text-slate-500">
              Today • 11:00 AM
            </p>
          </motion.div>

          {/* ACTIONS */}
          <div className="grid grid-cols-4 gap-2">
            {patientActions.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    item.color
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-600">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}