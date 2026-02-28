import { useState, useEffect, FormEvent } from "react";
import { Search, Truck, Clock, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { motion } from "motion/react";

const mockStatus = {
  id: "VFS-9823471",
  status: "In Progress",
  lastUpdate: "2026-02-28 10:30 AM",
  location: "London Visa Application Centre",
  history: [
    { date: "2026-02-28 10:30 AM", status: "Application forwarded to Embassy", completed: true },
    { date: "2026-02-27 02:15 PM", status: "Documents received at VFS Centre", completed: true },
    { date: "2026-02-27 11:00 AM", status: "Biometrics captured", completed: true },
    { date: "2026-02-25 09:00 AM", status: "Appointment booked", completed: true },
  ]
};

export default function Tracking() {
  const [refNumber, setRefNumber] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myApplications, setMyApplications] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchMyApplications();
    }
  }, []);

  const fetchMyApplications = async () => {
    try {
      const res = await fetch("/api/applications/my", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      setMyApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (!refNumber) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-vfs-light pb-20">
      <div className="bg-vfs-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Track Your Application</h1>
          <p className="text-slate-300 max-w-2xl">
            Enter your reference number and last name to check the real-time status of your visa or passport application.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleTrack} className="space-y-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-vfs-blue uppercase tracking-wider">Reference Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. VFS-1234567" 
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-vfs-blue uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  placeholder="As per passport" 
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-vfs-blue text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="mr-2 w-5 h-5" />
                  Track Application
                </>
              )}
            </button>
          </form>

          {isLoggedIn && myApplications.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-vfs-blue mb-6">Your Applications</h3>
              <div className="space-y-4">
                {myApplications.map((app) => (
                  <div key={app.id} className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Passport: {app.passport_no}</p>
                      <p className="font-bold text-vfs-blue">{app.visa_type} to {app.destination}</p>
                      <p className="text-xs text-slate-500 mt-1">Submitted on {new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {app.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-slate-100 pt-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Application ID</p>
                  <h3 className="text-2xl font-bold text-vfs-blue">{mockStatus.id}</h3>
                </div>
                <div className="bg-vfs-gold/20 text-vfs-blue px-6 py-2 rounded-full font-bold flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {mockStatus.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-vfs-light rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-vfs-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Current Location</p>
                      <p className="font-bold text-vfs-blue">{mockStatus.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-vfs-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-vfs-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Last Updated</p>
                      <p className="font-bold text-vfs-blue">{mockStatus.lastUpdate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-vfs-blue mb-4 uppercase tracking-wider text-xs">Timeline</h4>
                  <div className="space-y-6 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100" />
                    {mockStatus.history.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-4 relative z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-vfs-gold' : 'bg-slate-200'}`}>
                          <CheckCircle2 className="w-4 h-4 text-vfs-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-vfs-blue">{item.status}</p>
                          <p className="text-xs text-slate-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-2xl flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Your application is currently being processed by the embassy. You will receive an SMS and email notification once a decision has been made and your documents are ready for collection/courier.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
