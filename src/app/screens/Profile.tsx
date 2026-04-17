import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, User, Phone, Mail, Camera, Save } from "lucide-react";

export function ProfileScreen() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
      if (savedRole === "doctor") {
        setFormData({ name: "Dr. M.G. Sharma", phone: "+91 98765 00000", email: "dr.sharma@mgshomeo.com" });
      } else {
        setFormData({ name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh.k@example.com" });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save and go back
    navigate(-1);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-full pb-24 relative">
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-0 z-20 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-6 mt-8 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
              <User className="w-10 h-10 text-teal-600" />
            </div>
            <button 
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-slate-800 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3 uppercase tracking-wider">{role} account</p>
        </div>

        {/* Inputs Section */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">Phone Number</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-200 transition-all active:scale-[0.98]"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </form>
    </div>
  );
}
