import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-vfs-light">
      <div className="bg-vfs-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Have questions about your visa application? Our support team is here to help you 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-vfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-vfs-blue mb-2">Call Us</h3>
              <p className="text-slate-500 mb-4">Our helpline is available for urgent queries.</p>
              <p className="text-vfs-gold font-bold text-lg">+44 20 1234 5678</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-vfs-gold" />
              </div>
              <h3 className="text-xl font-bold text-vfs-blue mb-2">Email Us</h3>
              <p className="text-slate-500 mb-4">We usually respond within 24 hours.</p>
              <p className="text-vfs-gold font-bold text-lg">support@vfsglobal.com</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-vfs-blue mb-2">Our Office</h3>
              <p className="text-slate-500">
                123 Visa Street, Canary Wharf,<br />
                London, E14 5AB, United Kingdom
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold text-vfs-blue mb-8">Send us a Message</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all resize-none"
                    placeholder="Describe your query in detail..."
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="bg-vfs-blue text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center group">
                    Send Message
                    <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
