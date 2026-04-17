import { motion } from "motion/react";
import { Bell, Calendar, Megaphone, CheckCircle2, FileWarning } from "lucide-react";
import { clsx } from "clsx";

export function NotificationsScreen() {
  const notifications = [
    {
      id: "n1",
      title: "Appointment Reminder",
      message: "You have an upcoming appointment with Dr. M.G. Sharma tomorrow at 10:30 AM at the Main Clinic.",
      time: "2 hours ago",
      type: "reminder",
      read: false
    },
    {
      id: "n2",
      title: "Follow-up Due",
      message: "It's been 4 weeks since your last visit. Please book a follow-up for your allergic rhinitis.",
      time: "Yesterday",
      type: "alert",
      read: false
    },
    {
      id: "n3",
      title: "Clinic Update",
      message: "The South Branch will be closed this Friday for maintenance. Please reschedule if needed.",
      time: "3 days ago",
      type: "update",
      read: true
    },
    {
      id: "n4",
      title: "Prescription Refill",
      message: "Your current dose of Natrum Mur is likely finishing soon. Consult if you need a refill.",
      time: "Last week",
      type: "alert",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "reminder": return <Calendar className="w-5 h-5 text-indigo-600" />;
      case "alert": return <FileWarning className="w-5 h-5 text-orange-600" />;
      case "update": return <Megaphone className="w-5 h-5 text-emerald-600" />;
      default: return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "reminder": return "bg-indigo-100";
      case "alert": return "bg-orange-100";
      case "update": return "bg-emerald-100";
      default: return "bg-slate-100";
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-full pb-24 relative">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-0 z-20 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Notifications</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Stay updated</p>
        </div>
        <button className="text-teal-600 text-xs font-bold hover:text-teal-700 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {notifications.map((notif, idx) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={clsx(
              "p-5 rounded-3xl flex gap-4 transition-all",
              notif.read ? "bg-white shadow-sm border border-slate-100" : "bg-teal-50/50 shadow-md border border-teal-100/50"
            )}
          >
            <div className="mt-1 relative shrink-0">
              <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", getBg(notif.type))}>
                {getIcon(notif.type)}
              </div>
              {!notif.read && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={clsx("text-sm font-bold tracking-tight", notif.read ? "text-slate-700" : "text-slate-900")}>
                  {notif.title}
                </h3>
                <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap ml-2">
                  {notif.time}
                </span>
              </div>
              <p className={clsx("text-sm leading-relaxed", notif.read ? "text-slate-500" : "text-slate-700 font-medium")}>
                {notif.message}
              </p>
              
              {!notif.read && notif.type === "reminder" && (
                <div className="mt-3 flex gap-2">
                  <button className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    Reschedule
                  </button>
                  <button className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-teal-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
