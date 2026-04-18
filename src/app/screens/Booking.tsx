import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CheckCircle2,
  Users,
  Phone,
  UserRound,
  Plus,
  X,
} from "lucide-react";

export function BookingScreen() {
  const [role, setRole] = useState<string | null>(null);

  const [patients, setPatients] = useState<any[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);

  const [showAddPatient, setShowAddPatient] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");

  const [step, setStep] = useState(1);

  // patient schedule state (ONLY UI)
  const [selectedDate, setSelectedDate] = useState("12");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, []);

  const isDoctor = role === "doctor";

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/patients");
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    if (!name || !age || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age: Number(age),
          gender,
          phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPatients((prev) => [data, ...prev]);
        setName("");
        setAge("");
        setGender("Male");
        setPhone("");
        setShowAddPatient(false);
      } else {
        alert(data.message || "Failed to save patient");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const handleConfirm = () => {
    setStep(2);
  };

  if (role === null) return null;

  // ================= DOCTOR VIEW (UNCHANGED) =================
  if (isDoctor) {
    return (
      <div className="min-h-screen flex justify-center bg-black">
        <div className="w-full max-w-[420px] min-h-screen bg-slate-50 pb-24 relative">

          <div className="bg-teal-600 pt-14 pb-8 px-5 rounded-b-[2rem]">
            <h1 className="text-xl font-bold text-white">
              Patient List
            </h1>
            <p className="text-teal-100 text-sm mt-1">
              Clinic Patient Records
            </p>
          </div>

          <div className="px-4 -mt-5">
            <div className="bg-white rounded-3xl shadow p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Total Patients</p>
                <h2 className="text-xl font-bold text-slate-800">
                  {patients.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="px-4 mt-5 space-y-4">
            {loadingPatients ? (
              <div className="text-center py-10 text-sm text-slate-500">
                Loading...
              </div>
            ) : (
              patients.map((patient: any, i) => (
                <motion.div
                  key={patient._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-4 shadow border"
                >
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <UserRound className="w-5 h-5 text-indigo-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm">{patient.name}</h3>
                      <p className="text-xs text-slate-500">
                        {patient.age} yrs • {patient.gender}
                      </p>
                      <p className="text-xs text-slate-500 flex gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="px-4 mt-5">
            <button
              onClick={() => setShowAddPatient(true)}
              className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold flex justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Patient
            </button>
          </div>

          {showAddPatient && (
            <div className="fixed inset-0 bg-black/40 flex items-end justify-center">
              <div className="w-full max-w-[420px] bg-white rounded-t-3xl p-4">
                <div className="flex justify-between">
                  <h2 className="font-bold">Add Patient</h2>
                  <button onClick={() => setShowAddPatient(false)}>
                    <X />
                  </button>
                </div>

                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
                <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="border p-2 w-full" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border p-2 w-full" />

                <button onClick={handleAddPatient} className="w-full bg-teal-600 text-white p-3 mt-2">
                  Save
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ================= PATIENT VIEW (SCHEDULE UI) =================
  return (
    <div className="min-h-screen flex justify-center bg-black">
      <div className="w-full max-w-[420px] min-h-screen bg-slate-50 pb-24">

        <div className="bg-teal-600 pt-14 pb-8 px-5 rounded-b-[2rem]">
          <h1 className="text-xl font-bold text-white">
            Schedule Appointment
          </h1>
          <p className="text-teal-100 text-sm mt-1">
            Choose date & time
          </p>
        </div>

        {step === 1 ? (
          <div className="p-5 space-y-6">

            {/* DATE */}
            <div>
              <h2 className="text-sm font-bold mb-3">Select Date</h2>
              <div className="flex gap-2">
                {["10","11","12","13","14"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`px-4 py-3 rounded-xl border text-sm font-bold ${
                      selectedDate === d ? "bg-teal-600 text-white" : "bg-white"
                    }`}
                  >
                    Oct {d}
                  </button>
                ))}
              </div>
            </div>

            {/* TIME */}
            <div>
              <h2 className="text-sm font-bold mb-3">Select Time</h2>
              <div className="grid grid-cols-3 gap-2">
                {["9:00 AM","10:00 AM","11:00 AM","12:00 PM"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 rounded-xl border text-xs font-bold ${
                      selectedTime === t ? "bg-teal-600 text-white" : "bg-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold flex justify-center gap-2"
            >
              Confirm Appointment <ChevronRight />
            </button>

          </div>
        ) : (
          <div className="p-6 text-center">
            <CheckCircle2 className="mx-auto text-emerald-500 w-10 h-10" />
            <h2 className="text-xl font-bold mt-3">
              Booking Confirmed!
            </h2>

            <button
              onClick={() => setStep(1)}
              className="mt-6 bg-teal-50 text-teal-700 px-6 py-3 rounded-full"
            >
              Book Another
            </button>
          </div>
        )}

      </div>
    </div>
  );
}