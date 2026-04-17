import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Calendar, Pill, Search, Stethoscope, FileClock, Droplets, Leaf, ChevronDown, UserSquare2, Phone } from "lucide-react";

export function HistoryScreen() {
  const [expandedPatientId, setExpandedPatientId] = useState<string | null>("p1");

  const patients = [
    {
      id: "p1",
      name: "Rajesh Kumar",
      age: 42,
      gender: "Male",
      phone: "+91 98765 43210",
      visits: [
        {
          id: "v1",
          date: "Sep 15, 2026",
          type: "Follow-up",
          symptoms: ["Mild headache", "Fatigue"],
          diagnosis: "Stress-induced Migraine",
          prescription: ["Belladonna 30CH (3 times/day)"],
          notes: "Advised 8 hours of sleep and reducing screen time."
        },
        {
          id: "v2",
          date: "Aug 02, 2026",
          type: "Initial Consultation",
          symptoms: ["Severe allergic rhinitis", "Sneezing", "Watery eyes"],
          diagnosis: "Allergic Rhinitis",
          prescription: ["Allium Cepa 30CH (every 2 hrs)", "Natrum Mur 200CH (weekly)"],
          notes: "Started initial constitutional treatment. Avoid dust and cold drafts."
        }
      ]
    },
    {
      id: "p2",
      name: "Priya Singh",
      age: 28,
      gender: "Female",
      phone: "+91 87654 32109",
      visits: [
        {
          id: "v3",
          date: "Oct 10, 2026",
          type: "Follow-up",
          symptoms: ["Joint pain", "Morning stiffness"],
          diagnosis: "Rheumatoid Arthritis (Early Stage)",
          prescription: ["Rhus Tox 30CH (Morning & Evening)", "Bryonia 30CH (SOS)"],
          notes: "Pain has reduced by 30%. Advised gentle stretching exercises."
        }
      ]
    }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-full pb-24 relative">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-0 z-20">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Patient Records</h1>
        <p className="text-xs font-medium text-slate-500 mt-0.5">Directory & Medical History</p>
        
        {/* Search Bar */}
        <div className="mt-4 relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search patients by name or phone..."
            className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {patients.map((patient, index) => {
          const isExpanded = expandedPatientId === patient.id;
          
          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden"
            >
              {/* Patient Header (Clickable) */}
              <button
                onClick={() => setExpandedPatientId(isExpanded ? null : patient.id)}
                className="w-full text-left bg-white px-5 py-4 flex items-center justify-between transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                    <UserSquare2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">{patient.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium text-slate-500">{patient.age} yrs, {patient.gender}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {patient.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'bg-indigo-50 rotate-180' : 'bg-slate-50'}`}>
                  <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>
              </button>

              {/* Patient History Detail */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-50/50"
                  >
                    <div className="p-5 pt-2 space-y-5 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" /> Visit History
                      </h4>
                      
                      <div className="space-y-4 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-3 top-2 bottom-2 w-px bg-indigo-100" />
                        
                        {patient.visits.map((visit, vIdx) => (
                          <div key={visit.id} className="relative pl-8">
                            {/* Timeline Dot */}
                            <div className="absolute left-[10px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
                            
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {visit.date}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                                  {visit.type}
                                </span>
                              </div>
                              
                              <div>
                                <h5 className="text-xs font-semibold text-slate-500 mb-1">Diagnosis</h5>
                                <p className="text-sm font-bold text-slate-800">{visit.diagnosis}</p>
                              </div>
                              
                              <div>
                                <h5 className="text-xs font-semibold text-slate-500 mb-1">Prescription</h5>
                                <div className="space-y-1">
                                  {visit.prescription.map((med, i) => (
                                    <div key={i} className="text-xs font-medium text-slate-700 flex items-start gap-1.5">
                                      <Leaf className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                      <span>{med}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                  <FileClock className="w-3 h-3" /> Doctor's Notes
                                </h5>
                                <p className="text-xs text-slate-600 italic">"{visit.notes}"</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" /> Add New Record
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
