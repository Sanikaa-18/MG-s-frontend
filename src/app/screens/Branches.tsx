import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation, Map } from "lucide-react";

export function BranchesScreen() {
  const branches = [
    {
      id: "main",
      name: "Main Clinic (North)",
      address: "123 Healing Way, Harmony District",
      phone: "+91 98765 43210",
      timings: "Mon-Sat: 9:00 AM - 1:00 PM",
      image: "https://images.unsplash.com/photo-1769698678497-c41f0ab47c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGluaWMlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MzIwNDMzNnww&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Open Now"
    },
    {
      id: "south",
      name: "South Branch",
      address: "45 Serenity Blvd, South Park",
      phone: "+91 98765 01234",
      timings: "Mon-Sat: 4:00 PM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc3MzE5MDQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Opens 4 PM"
    }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-full pb-24">
      {/* Top Bar */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-0 z-20 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Clinic Locations</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Dr. M.G. Sharma's branches</p>
        </div>
        <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100 shadow-sm">
          <Map className="w-5 h-5 text-teal-600" />
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {branches.map((branch, idx) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
          >
            <div className="relative h-44 group overflow-hidden">
              <img 
                src={branch.image} 
                alt={branch.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${branch.status.includes('Open') ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                <span className="text-xs font-bold text-slate-700">{branch.status}</span>
              </div>
              <h2 className="absolute bottom-4 left-5 text-white font-bold text-lg">{branch.name}</h2>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <MapPin className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-0.5">{branch.address}</p>
                  <button className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors">
                    <Navigation className="w-3 h-3" /> Get Directions
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Phone className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{branch.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Clock className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{branch.timings}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-2">
                <button className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 py-3.5 rounded-xl text-sm font-bold transition-colors">
                  Book Appointment Here
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
