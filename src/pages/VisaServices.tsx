import { useState } from "react";
import { Search, MapPin, Globe, ArrowRight, Info } from "lucide-react";
import { motion } from "motion/react";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", popular: true },
  { name: "Canada", flag: "🇨🇦", popular: true },
  { name: "Australia", flag: "🇦🇺", popular: true },
  { name: "Germany", flag: "🇩🇪", popular: true },
  { name: "France", flag: "🇫🇷", popular: true },
  { name: "Italy", flag: "🇮🇹", popular: false },
  { name: "Japan", flag: "🇯🇵", popular: false },
  { name: "USA", flag: "🇺🇸", popular: true },
];

export default function VisaServices() {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-vfs-light pb-20">
      {/* Header */}
      <div className="bg-vfs-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Visa Services</h1>
          <p className="text-slate-300 max-w-2xl">
            Find the right visa for your trip. Select your destination to view requirements, fees, and processing times.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Where are you going?" 
              className="w-full pl-16 pr-8 py-6 rounded-2xl border-2 border-slate-100 focus:border-vfs-gold outline-none text-xl transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-vfs-blue mb-8 flex items-center">
                <Globe className="mr-3 text-vfs-gold" />
                Popular Destinations
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDestinations.map((dest, idx) => (
                  <motion.div 
                    key={dest.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-vfs-gold hover:bg-vfs-light transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{dest.flag}</span>
                      <span className="font-bold text-vfs-blue">{dest.name}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-vfs-gold group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>

              {filteredDestinations.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl">
                  <p className="text-slate-500 text-lg">No destinations found matching "{search}"</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-vfs-blue/5 p-8 rounded-3xl border border-vfs-blue/10">
                <h3 className="text-xl font-bold text-vfs-blue mb-4 flex items-center">
                  <Info className="mr-2 w-5 h-5 text-vfs-gold" />
                  Important Info
                </h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-vfs-gold mt-1.5 mr-3 flex-shrink-0" />
                    Processing times vary by destination and visa type.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-vfs-gold mt-1.5 mr-3 flex-shrink-0" />
                    Ensure your passport is valid for at least 6 months.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-vfs-gold mt-1.5 mr-3 flex-shrink-0" />
                    Biometrics may be required for certain destinations.
                  </li>
                </ul>
              </div>

              <div className="bg-vfs-gold p-8 rounded-3xl text-vfs-blue">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-sm mb-6 opacity-80">Our support team is available 24/7 to assist with your application.</p>
                <button className="w-full bg-vfs-blue text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
