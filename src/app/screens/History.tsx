import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Search,
  FileClock,
  Leaf,
  ChevronDown,
  UserSquare2,
  Phone,
  X,
  Plus,
} from "lucide-react";

export function HistoryScreen() {
  const [expandedPatientId, setExpandedPatientId] =
    useState<string | null>(null);

  const [patients, setPatients] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [selectedPatientId, setSelectedPatientId] =
    useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] =
    useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/patients"
      );
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (value: string) => {
    const d = new Date(value);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const resetForm = () => {
    setSelectedPatientId("");
    setDate("");
    setType("");
    setDiagnosis("");
    setPrescription("");
    setNotes("");
  };

  // ✅ FIXED SAVE RECORD BUTTON
  const handleAddRecord = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (
      !selectedPatientId ||
      !date ||
      !type ||
      !diagnosis
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newVisit = {
      id: Date.now().toString(),
      date: formatDate(date),
      type,
      diagnosis,
      prescription: prescription
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      notes,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/patients/${selectedPatientId}/visit`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(newVisit),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      const updatedPatient =
        await res.json();

      setPatients((prev) =>
        prev.map((patient) =>
          patient._id === updatedPatient._id
            ? updatedPatient
            : patient
        )
      );

      setExpandedPatientId(
        selectedPatientId
      );
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Record not saved");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-black">
      <div className="w-full max-w-[420px] min-h-screen bg-slate-50 pb-28 relative">
        {/* HEADER */}
        <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
          <h1 className="text-lg font-bold text-slate-800">
            Patient Records
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Directory & Medical History
          </p>

          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />

            <input
              type="text"
              placeholder="Search patients..."
              className="w-full bg-slate-100 rounded-2xl py-3 pl-10 pr-4 text-sm outline-none"
            />
          </div>
        </div>

        {/* PATIENTS */}
        <div className="px-4 py-4 space-y-4">
          {patients.map((patient) => {
            const isExpanded =
              expandedPatientId ===
              patient._id;

            return (
              <div
                key={patient._id}
                className="bg-white rounded-3xl shadow border overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedPatientId(
                      isExpanded
                        ? null
                        : patient._id
                    )
                  }
                  className="w-full px-4 py-4 flex justify-between"
                >
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <UserSquare2 className="w-5 h-5 text-indigo-600" />
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold text-sm">
                        {patient.name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {patient.age} yrs •{" "}
                        {patient.gender}
                      </p>

                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 transition ${
                      isExpanded
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 bg-slate-50 space-y-3">
                    {(patient.visits || [])
                      .length === 0 && (
                      <div className="bg-white p-4 rounded-xl text-sm text-center text-slate-500">
                        No records yet
                      </div>
                    )}

                    {(patient.visits || []).map(
                      (
                        visit: any,
                        i: number
                      ) => (
                        <div
                          key={i}
                          className="bg-white rounded-2xl p-4 space-y-3"
                        >
                          <div className="flex justify-between">
                            <span className="text-xs flex gap-1 items-center">
                              <Calendar className="w-3 h-3" />
                              {visit.date}
                            </span>

                            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold">
                              {visit.type}
                            </span>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Diagnosis
                            </p>
                            <p className="font-bold text-sm">
                              {
                                visit.diagnosis
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Prescription
                            </p>

                            {(visit.prescription ||
                              []).map(
                              (
                                med: string,
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="text-xs flex gap-1"
                                >
                                  <Leaf className="w-3 h-3 mt-0.5 text-emerald-500" />
                                  {med}
                                </div>
                              )
                            )}
                          </div>

                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] uppercase text-slate-400 flex gap-1 items-center">
                              <FileClock className="w-3 h-3" />
                              Notes
                            </p>

                            <p className="text-xs italic">
                              {visit.notes}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* BUTTON */}
          <button
            type="button"
            onClick={() =>
              setShowForm(true)
            }
            className="w-full bg-indigo-600 text-white py-4 rounded-3xl font-bold"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Record
            </div>
          </button>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
            <div className="w-full max-w-[420px] bg-white rounded-t-3xl p-4 space-y-3">
              <div className="flex justify-between">
                <h2 className="font-bold text-lg">
                  Add New Record
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  <X />
                </button>
              </div>

              <select
                value={selectedPatientId}
                onChange={(e) =>
                  setSelectedPatientId(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient._id}
                    value={patient._id}
                  >
                    {patient.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="Visit Type"
                value={type}
                onChange={(e) =>
                  setType(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) =>
                  setDiagnosis(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="Prescription"
                value={prescription}
                onChange={(e) =>
                  setPrescription(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />

              <textarea
                rows={3}
                placeholder="Notes"
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />

              {/* ✅ CLICKABLE */}
              <button
                type="button"
                onClick={handleAddRecord}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold cursor-pointer active:scale-95"
              >
                Save Record
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}