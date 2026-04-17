import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export function BookingScreen() {
  const [step, setStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [selectedDate, setSelectedDate] = useState("12"); // Mock simple date selection
  const [selectedTime, setSelectedTime] = useState("10:30 AM");

  const dates = [
    { day: "Mon", date: "10" },
    { day: "Tue", date: "11" },
    { day: "Wed", date: "12" },
    { day: "Thu", date: "13" },
    { day: "Fri", date: "14" },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"
  ];

  const handleConfirm = () => {
    setStep(2);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-full pb-24 relative overflow-hidden">
      {/* Header Area */}
      <div className="bg-teal-600 pt-16 pb-8 px-6 rounded-b-[2rem] shadow-md relative z-10">
        <h1 className="text-xl font-bold text-white tracking-tight">Book Appointment</h1>
        <p className="text-teal-100 text-sm font-medium mt-1">Schedule your visit</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-6 py-6 space-y-8"
          >
            {/* Branch Selection */}
            <section>
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" /> Select Branch
              </h2>
              <div className="flex flex-col gap-3">
                <label className={clsx(
                  "flex items-center p-4 border rounded-2xl cursor-pointer transition-all",
                  selectedBranch === "main" ? "border-teal-500 bg-teal-50/50 shadow-sm" : "border-slate-200 bg-white"
                )}>
                  <input
                    type="radio"
                    name="branch"
                    value="main"
                    checked={selectedBranch === "main"}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="hidden"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">Main Clinic (North)</h3>
                    <p className="text-xs text-slate-500 mt-0.5">9:00 AM - 1:00 PM</p>
                  </div>
                  <div className={clsx(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    selectedBranch === "main" ? "border-teal-500" : "border-slate-300"
                  )}>
                    {selectedBranch === "main" && <div className="w-2.5 h-2.5 bg-teal-500 rounded-full" />}
                  </div>
                </label>
                <label className={clsx(
                  "flex items-center p-4 border rounded-2xl cursor-pointer transition-all",
                  selectedBranch === "south" ? "border-teal-500 bg-teal-50/50 shadow-sm" : "border-slate-200 bg-white"
                )}>
                  <input
                    type="radio"
                    name="branch"
                    value="south"
                    checked={selectedBranch === "south"}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="hidden"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">South Branch</h3>
                    <p className="text-xs text-slate-500 mt-0.5">4:00 PM - 8:00 PM</p>
                  </div>
                  <div className={clsx(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    selectedBranch === "south" ? "border-teal-500" : "border-slate-300"
                  )}>
                    {selectedBranch === "south" && <div className="w-2.5 h-2.5 bg-teal-500 rounded-full" />}
                  </div>
                </label>
              </div>
            </section>

            {/* Date Selection */}
            <section>
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-teal-600" /> Select Date (Oct 2026)
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
                {dates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={clsx(
                      "flex-shrink-0 w-[4.5rem] h-20 rounded-[1.25rem] flex flex-col items-center justify-center gap-1 border transition-all snap-center",
                      selectedDate === d.date 
                        ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-200" 
                        : "bg-white border-slate-200 text-slate-600"
                    )}
                  >
                    <span className={clsx("text-[10px] font-bold uppercase tracking-wider", selectedDate === d.date ? "text-teal-100" : "text-slate-400")}>
                      {d.day}
                    </span>
                    <span className="text-xl font-black">{d.date}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Time Slots */}
            <section>
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" /> Available Time
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={clsx(
                      "py-3 rounded-xl text-xs font-bold border transition-all",
                      selectedTime === time
                        ? "bg-teal-50 border-teal-500 text-teal-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </section>

            {/* Bottom Sticky Action */}
            <div className="fixed bottom-[80px] left-0 right-0 px-6 max-w-[400px] mx-auto z-40 pb-4">
              <button
                onClick={handleConfirm}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
              >
                Confirm Appointment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 h-[60vh] text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-100/50 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </motion.div>
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Booking Confirmed!</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-[250px]">
              Your appointment with Dr. M.G. Sharma is set for Oct {selectedDate} at {selectedTime}.
            </p>
            
            <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left mb-6">
               <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                 <span className="text-xs font-semibold text-slate-500">Branch</span>
                 <span className="text-sm font-bold text-slate-800">{selectedBranch === 'main' ? 'Main Clinic' : 'South Branch'}</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs font-semibold text-slate-500">Date & Time</span>
                 <span className="text-sm font-bold text-slate-800">Oct {selectedDate}, {selectedTime}</span>
               </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-teal-600 font-bold text-sm bg-teal-50 px-6 py-3 rounded-full hover:bg-teal-100 transition-colors"
            >
              Book Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
