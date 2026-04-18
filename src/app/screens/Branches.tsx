import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import {
  Send,
  User,
  ArrowLeft,
  Search,
  MapPin,
  Phone,
  Clock,
  Navigation,
} from "lucide-react";

const socket: Socket = io("http://localhost:5000");

export default function BranchesScreen() {
  const role = localStorage.getItem("role");

  if (role === "patient") {
    return <PatientBranchesView />;
  }

  return <DoctorChatView />;
}






// ========================= 🧑 PATIENT VIEW =========================
function PatientBranchesView() {
  const clinic = {
    name: "MG's Health & Wellness Clinic",
    address: `Pange Apartment, Shop No 4,
Behind Ashapura Medical,
Varcha Gaon, Kolshet`,
    phone: "+91 78880 50787",
    timings: `Morning: 10:30 AM – 1:30 PM
Evening: 6:30 PM – 9:00 PM`,
    image1: "/clinic-board.jpeg",
    image2: "/clinic-inside.jpeg",
    mapLink: "https://maps.google.com/?q=Kolshet+Varcha+Gaon",
  };

  return (
    <div className="min-h-screen bg-slate-50 max-w-[420px] mx-auto pb-10">
      <div className="bg-white px-6 pt-12 pb-4 shadow">
        <h1 className="text-lg font-bold">{clinic.name}</h1>
      </div>

      <img src={clinic.image1} className="w-full h-52 object-cover" />
      <img src={clinic.image2} className="w-full h-52 object-cover mt-2" />

      <div className="p-5 mt-4 bg-white rounded-2xl space-y-5 shadow">
        <div className="flex gap-3">
          <MapPin className="text-teal-600" />
          <p className="whitespace-pre-line text-sm font-semibold">
            {clinic.address}
          </p>
        </div>

        <div className="flex gap-3">
          <Phone className="text-teal-600" />
          <p className="text-sm font-semibold">{clinic.phone}</p>
        </div>

        <div className="flex gap-3">
          <Clock className="text-teal-600" />
          <p className="whitespace-pre-line text-sm font-semibold">
            {clinic.timings}
          </p>
        </div>

        <a
          href={clinic.mapLink}
          target="_blank"
          className="block text-center bg-teal-600 text-white py-3 rounded-xl font-bold"
        >
          <Navigation className="inline w-4 h-4 mr-1" />
          Get Directions
        </a>
      </div>
    </div>
  );
}






// ========================= 👨‍⚕️ DOCTOR CHAT VIEW =========================
function DoctorChatView() {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const senderId = "doctor1";

  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
      .then((res) => res.json())
      .then(setPatients);
  }, []);

  useEffect(() => {
    if (!selectedPatient) return;

    const receiverId = selectedPatient._id;
    const roomId = [senderId, receiverId].sort().join("_");

    socket.emit("joinRoom", roomId);

    fetch(`http://localhost:5000/api/messages/${senderId}/${receiverId}`)
      .then((res) => res.json())
      .then(setMessages);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedPatient]);

  const sendMessage = () => {
    if (!message.trim() || !selectedPatient) return;

    const receiverId = selectedPatient._id;
    const roomId = [senderId, receiverId].sort().join("_");

    socket.emit("sendMessage", {
      senderId,
      receiverId,
      text: message,
      roomId,
    });

    setMessage("");
  };

  if (!selectedPatient) {
    return (
      <div className="min-h-screen bg-slate-50 max-w-[420px] mx-auto">
        <div className="bg-white px-4 pt-12 pb-4 shadow">
          <h1 className="text-lg font-bold">Messages</h1>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search patients..."
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="p-4 space-y-3">
          {patients.map((p) => (
            <div
              key={p._id}
              onClick={() => setSelectedPatient(p)}
              className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm"
            >
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <p className="font-semibold text-sm">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 max-w-[420px] mx-auto flex flex-col">
      <div className="bg-white px-4 pt-12 pb-3 flex items-center gap-3 shadow">
        <button onClick={() => setSelectedPatient(null)}>
          <ArrowLeft />
        </button>
        <p className="font-semibold">{selectedPatient.name}</p>
      </div>

      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.senderId === senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm ${
                msg.senderId === senderId
                  ? "bg-teal-600 text-white"
                  : "bg-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-white flex gap-2 border-t">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-teal-600 text-white px-4 rounded-full"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}