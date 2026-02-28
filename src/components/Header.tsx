import { Link, NavLink, useNavigate } from "react-router-dom";
import { Globe, User, Search, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b border-slate-100">
      {/* Top Bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <a href="#" className="text-vfs-blue border-b-2 border-vfs-blue pb-0.5">For Individuals</a>
            <a href="#" className="hover:text-vfs-blue transition-colors">For Governments</a>
          </div>
          {user && (
            <div className="flex items-center space-x-4 text-[11px] font-bold text-vfs-blue uppercase tracking-wider">
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 transition-colors">
                <LogOut className="w-3 h-3 mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 rounded-full border-2 border-vfs-blue flex items-center justify-center">
                  <span className="text-vfs-blue font-bold text-[10px]">vfs.</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-800">VFS.GLOBAL</span>
              </div>
              <span className="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-bold -mt-1 ml-1">Est. 2001</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => `text-[13px] font-semibold hover:text-vfs-blue transition-colors ${isActive ? 'text-vfs-blue' : 'text-slate-600'}`}>
              Home
            </NavLink>
            <NavLink to="/visa-services" className={({ isActive }) => `text-[13px] font-semibold hover:text-vfs-blue transition-colors ${isActive ? 'text-vfs-blue' : 'text-slate-600'}`}>
              Visa Services
            </NavLink>
            <NavLink to="/tracking" className={({ isActive }) => `text-[13px] font-semibold hover:text-vfs-blue transition-colors ${isActive ? 'text-vfs-blue' : 'text-slate-600'}`}>
              Track Application
            </NavLink>
            <NavLink to="/apply" className={({ isActive }) => `text-[13px] font-semibold hover:text-vfs-blue transition-colors ${isActive ? 'text-vfs-blue' : 'text-slate-600'}`}>
              Apply Now
            </NavLink>
            <NavLink to="/book-appointment" className={({ isActive }) => `text-[13px] font-semibold hover:text-vfs-blue transition-colors ${isActive ? 'text-vfs-blue' : 'text-slate-600'}`}>
              Book Appointment
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `text-[13px] font-semibold hover:text-vfs-blue transition-colors ${isActive ? 'text-vfs-blue' : 'text-slate-600'}`}>
              Contact
            </NavLink>
            
            {!user ? (
              <Link to="/login" className="ml-4 border border-vfs-gold text-vfs-gold px-4 py-1.5 rounded text-[12px] font-bold hover:bg-vfs-gold hover:text-white transition-all">
                Login / Register
              </Link>
            ) : user.role === 'admin' ? (
              <Link to="/admin" className="ml-4 bg-vfs-blue text-white px-4 py-1.5 rounded text-[12px] font-bold hover:bg-slate-800 transition-all">
                Admin Panel
              </Link>
            ) : null}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Home</NavLink>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">About</a>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Solutions</a>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Footprint</a>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Insights</a>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Media</a>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Careers</a>
              <a href="#" className="block px-3 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md">Sustainability</a>
              <button className="w-full mt-4 border border-vfs-gold text-vfs-gold px-4 py-3 rounded text-sm font-bold hover:bg-vfs-gold hover:text-white transition-all">
                Contact us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
