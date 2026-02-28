import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-vfs-gold rounded-full flex items-center justify-center">
                <span className="text-vfs-blue font-bold text-xs">VFS</span>
              </div>
              <span className="text-xl font-bold tracking-tighter">VFS GLOBAL</span>
            </div>
            <p className="text-sm leading-relaxed">
              VFS Global is the world's largest outsourcing and technology services specialist for governments and diplomatic missions worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-vfs-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-vfs-gold transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-vfs-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-vfs-gold transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Services</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/visa-services" className="hover:text-vfs-gold transition-colors">Visa Services</Link></li>
              <li><Link to="/passport-services" className="hover:text-vfs-gold transition-colors">Passport Services</Link></li>
              <li><Link to="/consular-services" className="hover:text-vfs-gold transition-colors">Consular Services</Link></li>
              <li><Link to="/value-added-services" className="hover:text-vfs-gold transition-colors">Value Added Services</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/faqs" className="hover:text-vfs-gold transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-vfs-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-vfs-gold transition-colors">Feedback & Complaints</Link></li>
              <li><Link to="/refund-policy" className="hover:text-vfs-gold transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Corporate</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="flex items-center hover:text-vfs-gold transition-colors">About Us <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li><a href="#" className="flex items-center hover:text-vfs-gold transition-colors">Careers <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li><a href="#" className="flex items-center hover:text-vfs-gold transition-colors">Media Centre <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li><a href="#" className="flex items-center hover:text-vfs-gold transition-colors">Sustainability <ExternalLink className="w-3 h-3 ml-1" /></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>© 2026 VFS Global Group. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
