import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FileText, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Apply() {
  const [passportNo, setPassportNo] = useState("");
  const [visaType, setVisaType] = useState("Tourist");
  const [destination, setDestination] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ passport_no: passportNo, visa_type: visaType, destination }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/tracking"), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-vfs-light flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-vfs-blue mb-4">Application Submitted!</h2>
          <p className="text-slate-500">Redirecting you to tracking page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vfs-light pb-20">
      <div className="bg-vfs-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Visa Application</h1>
          <p className="text-slate-300 max-w-2xl">
            Complete the form below to start your visa application process. Ensure all details match your passport exactly.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Passport Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. A1234567"
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                  value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Visa Type</label>
                <select 
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                >
                  <option value="Tourist">Tourist Visa</option>
                  <option value="Business">Business Visa</option>
                  <option value="Student">Student Visa</option>
                  <option value="Work">Work Visa</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-vfs-blue uppercase tracking-widest">Destination Country</label>
              <input 
                type="text" 
                required
                placeholder="Where are you traveling to?"
                className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-vfs-gold outline-none transition-all"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl flex items-start space-x-4 border border-amber-100">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                By submitting this form, you confirm that all information provided is accurate. Incorrect information may lead to delays or rejection of your application.
              </p>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-vfs-blue text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
