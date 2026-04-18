import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  CalendarPlus,
  Bell,
  User,
  Users,
  LogOut,
  UserCog,
  MessageCircle,
  Home,
  List,
} from "lucide-react";
import { clsx } from "clsx";

// ================= TYPES =================
type Appointment = {
  patientName: string;
  date: string;
  time: string;
};

type TodayAppointment = {
  id?: string;
};

type Patient = {
  id?: string;
};

type Tab = "home" | "records" | "messages" | "alerts";

export function DoctorHomeScreen() {
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole") || "";
  const isDoctor = role === "doctor";

  const [activeTab, setActiveTab] = useState<Tab>("home");

  const [nextAppointment, setNextAppointment] =
    useState<Appointment | null>(null);

  const [todayAppointments, setTodayAppointments] =
    useState<TodayAppointment[]>([]);

  const [patients, setPatients] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role) navigate("/");
  }, [navigate, role]);

  // ================= FETCH =================
  useEffect(() => {
    if (!isDoctor) return;

    const fetchData = async () => {
      try {
        const [nextRes, todayRes, patientsRes] = await Promise.all([
          fetch("/api/appointments/next"),
          fetch("/api/appointments/today"),
          fetch("/api/patients"),
        ]);

        setNextAppointment(await nextRes.json());
        setTodayAppointments(await todayRes.json());
        setPatients(await patientsRes.json());
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isDoctor]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ================= ACTION NAV MAP (SHARED LOGIC) =================
  const navMap = {
    home: "/doctor-home",
    records: "/history",
    messages: "/messages",
    alerts: "/notifications",
  };

  const doctorActions = [
  { id: "records", title: "Patient Records", icon: Users, color: "bg-indigo-50 text-indigo-600" },
  { id: "list", title: "Patients List", icon: List, color: "bg-emerald-50 text-emerald-600" },
  { id: "messages", title: "Messages", icon: MessageCircle, color: "bg-teal-50 text-teal-600" },
  { id: "alerts", title: "Alerts", icon: Bell, color: "bg-orange-50 text-orange-600" },
];

  const bottomNav = [
    { id: "home", icon: Home, label: "Home" },
    { id: "records", icon: Users, label: "Records" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "alerts", icon: Bell, label: "Alerts" },
  ];

  return (
    <div className="min-h-screen flex justify-center bg-black">
      <div className="w-full max-w-[420px] min-h-screen bg-slate-50 pb-24">

        {/* ================= HEADER ================= */}
        <div className="bg-teal-600 pt-10 pb-14 px-5 rounded-b-[2.5rem] relative">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-teal-100 text-xs">Good Morning</p>
              <h1 className="text-xl font-bold text-white">Doctor Dashboard</h1>
              <p className="text-[10px] text-white/70">Doctor Panel</p>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white rounded-2xl p-2 shadow-lg min-w-[180px]">

                  <DropdownMenu.Item onSelect={() => navigate("/profile")}>
                    <div className="px-3 py-2 flex gap-2 text-sm">
                      <UserCog className="w-4 h-4" />
                      Profile
                    </div>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item onSelect={handleLogout}>
                    <div className="px-3 py-2 flex gap-2 text-sm text-red-500">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </div>
                  </DropdownMenu.Item>

                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-4 pt-4 space-y-5">

          {/* ================= NEXT APPOINTMENT ALWAYS HOME ================= */}
          <motion.div className="bg-white rounded-3xl p-4 shadow">
            <h2 className="text-sm font-bold mb-3">
              Next Upcoming Appointment
            </h2>

            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : nextAppointment ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <CalendarPlus className="w-5 h-5 text-teal-600" />
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    {nextAppointment.patientName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {nextAppointment.date} • {nextAppointment.time}
                  </p>
                </div>
              </div>
            ) : (
              <p>No appointments</p>
            )}
          </motion.div>

          {/* ================= QUICK ACTIONS ================= */}
          <div>
            <h2 className="text-sm font-bold mb-3 px-1">Quick Actions</h2>

            <div className="grid grid-cols-4 gap-2">
              {doctorActions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      navigate(navMap[item.id as keyof typeof navMap]);
                    }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center", item.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px]">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= TODAY OVERVIEW (NEVER REMOVED) ================= */}
          <div className="bg-white rounded-3xl p-5 shadow">
            <h2 className="text-sm font-bold mb-3">Today's Overview</h2>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs">Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs">Appointments</p>
                <p className="text-2xl font-bold">{todayAppointments.length}</p>
              </div>

            </div>
          </div>

        </div>

        {/* ================= BOTTOM NAV (REAL NAVIGATION) ================= */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t flex justify-around py-3">

          {bottomNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  navigate(navMap[item.id as keyof typeof navMap]);
                }}
                className="flex flex-col items-center text-xs"
              >
                <Icon className={clsx("w-5 h-5 mb-1", isActive ? "text-teal-600" : "text-slate-500")} />
                <span className={isActive ? "text-teal-600" : "text-slate-500"}>
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>

      </div>
    </div>
  );
}