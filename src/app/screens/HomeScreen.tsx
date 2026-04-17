import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
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
  Stethoscope,
  LogOut,
  UserCog
} from "lucide-react";
import { clsx } from "clsx";

export function HomeScreen() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const isDoctor = role === "doctor";

  const patientActions = [
    { id: "book", title: "Book Appt", icon: CalendarPlus, color: "bg-teal-50 text-teal-600", path: "/book" },
    { id: "clinics", title: "Clinics", icon: MapPin, color: "bg-emerald-50 text-emerald-600", path: "/branches" },
    { id: "alerts", title: "Alerts", icon: Bell, color: "bg-orange-50 text-orange-600", path: "/notifications" },
    { id: "health", title: "Wellness", icon: Activity, color: "bg-indigo-50 text-indigo-600", path: "/dashboard" }
  ];

  const doctorActions = [
    { id: "records", title: "Records", icon: Users, color: "bg-indigo-50 text-indigo-600", path: "/history" },
    { id: "schedule", title: "Schedule", icon: CalendarPlus, color: "bg-teal-50 text-teal-600", path: "/book" },
    { id: "clinics", title: "Clinics", icon: MapPin, color: "bg-emerald-50 text-emerald-600", path: "/branches" },
    { id: "alerts", title: "Alerts", icon: Bell, color: "bg-orange-50 text-orange-600", path: "/notifications" }
  ];

  const quickActions = isDoctor ? doctorActions : patientActions;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-20">
      {/* Header */}
      <div className="bg-teal-600 pt-16 pb-24 px-6 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="text-teal-100 text-sm font-medium mb-1">Good Morning,</p>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isDoctor ? "Dr. M.G. Sharma" : "Rajesh Kumar"}
            </h1>
          </div>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-sm overflow-hidden outline-none transition-transform active:scale-95">
                <User className="w-6 h-6 text-white" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                align="end" 
                sideOffset={8} 
                className="bg-white rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 min-w-[200px] z-50"
              >
                <DropdownMenu.Item 
                  className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-slate-700 outline-none hover:bg-slate-50 rounded-xl cursor-pointer transition-colors" 
                  onSelect={() => navigate("/profile")}
                >
                  <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                    <UserCog className="w-4 h-4 text-teal-600" />
                  </div>
                  Edit Profile
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-slate-100 my-1 mx-2" />
                <DropdownMenu.Item 
                  className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-red-600 outline-none hover:bg-red-50 rounded-xl cursor-pointer transition-colors" 
                  onSelect={() => { 
                    localStorage.removeItem("userRole"); 
                    navigate("/"); 
                  }}
                >
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-red-500" />
                  </div>
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="px-6 -mt-16 relative z-20 space-y-6">
        {/* Next Appointment Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">
              {isDoctor ? "Next Patient" : "Upcoming Appointment"}
            </h2>
            <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">
              {isDoctor ? "In 15 mins" : "Confirmed"}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Oct</span>
              <span className="text-lg font-bold text-teal-600">12</span>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-800">
                {isDoctor ? "Rajesh Kumar" : "Dr. M.G. Sharma"}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                {isDoctor ? (
                  <><FileText className="w-3.5 h-3.5" /> Follow-up (Allergy)</>
                ) : (
                  <><MapPin className="w-3.5 h-3.5" /> South Branch</>
                )}
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3">
            {isDoctor ? (
              <>
                <button className="flex-1 bg-teal-50 text-teal-700 py-3 rounded-xl text-sm font-semibold hover:bg-teal-100 transition-colors" onClick={() => navigate('/history')}>
                  View Records
                </button>
                <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Delay 10m
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 bg-teal-50 text-teal-700 py-3 rounded-xl text-sm font-semibold hover:bg-teal-100 transition-colors">
                  Reschedule
                </button>
                <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-sm font-bold text-slate-800 mb-4 px-1">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2"
              >
                <div className={clsx(
                  "w-[4.2rem] h-[4.2rem] rounded-2xl flex items-center justify-center shadow-sm border border-white transition-transform active:scale-95",
                  action.color
                )}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-slate-600">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dynamic Bottom Card based on Role */}
        {!isDoctor ? (
          <>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative group cursor-pointer"
              onClick={() => navigate('/branches')}
            >
              <img 
                src="https://images.unsplash.com/photo-1709813610121-e2a51545e212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob21lb3BhdGh5JTIwY2xpbmljJTIwZG9jdG9yfGVufDF8fHx8MTc3MzIwNzYwOXww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Clinic" 
                className="w-full h-36 object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      Meet Our Specialist
                    </h3>
                    <p className="text-teal-50 text-sm font-medium opacity-90">20+ years of healing experience</p>
                  </div>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex gap-4 items-start">
               <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                 <Activity className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-slate-800 mb-1">Daily Health Tip</h4>
                 <p className="text-xs text-slate-600 leading-relaxed">
                   Stay hydrated! Drinking warm water with a slice of lemon helps boost immunity and aids digestion.
                 </p>
               </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-800">Today's Overview</h2>
              <button className="text-xs font-semibold text-teal-600">View All</button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-500">Total Patients</span>
                <span className="text-2xl font-bold text-slate-800">24</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-500">Remaining</span>
                <span className="text-2xl font-bold text-teal-600">8</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-sm font-semibold text-slate-700">11:00 AM - Priya Singh</span>
                </div>
                <span className="text-xs text-slate-500">Initial Consult</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-sm font-semibold text-slate-700">11:30 AM - Amit Patel</span>
                </div>
                <span className="text-xs text-slate-500">Follow-up</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
