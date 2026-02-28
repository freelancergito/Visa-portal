import { motion } from "motion/react";
import { ArrowRight, FileText, Coffee, Bell, Truck, MapPin, Calendar, CheckCircle, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import { useState } from "react";

const tabs = [
  "Visas, eVisas & Permits",
  "Passport Services",
  "Attestation & Legalisation",
  "Verification Services",
  "Tourism Services"
];

const insights = [
  {
    title: "Visa at scale: Engineering seamless processing for travellers across the globe",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    desc: "VFS Global's advanced technology solutions ensure a smooth and efficient visa application journey for millions of applicants worldwide."
  },
  {
    title: "Cyber resilience as the backbone of travel infrastructure",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    desc: "Protecting applicant data and maintaining secure systems is at the heart of our digital transformation strategy."
  }
];

const testimonials = [
  {
    name: "Michael M.",
    country: "USA",
    text: "I used this service because I was panicked and didn't have time to renew my US passport on my own. As soon as I submitted my documents, they took over—and voilà, my passport arrived earlier than expected. I'd definitely recommend it to anyone who needs their passport fast."
  },
  {
    name: "Leonida",
    country: "UAE",
    text: "I have been in the UAE for around 30+ years and have never experienced this level of convenience. Everything was swift, location is accessible by metro, I could go after office hours to apply for Passport renewal and staff was super friendly. It is a great news for all my fellow Filipino overseas workers in UAE that our Government has tied-up with a reputable partner."
  },
  {
    name: "George Obeng-Akrofi",
    country: "USA",
    text: "What a great place to get my Ghanaian passport renewed! From my point of entry, through to the submission of my documents to the point where I left the VFS Global Centre, I felt welcomed and well received. I highly recommend this place to all who needs services regarding their passport applications!"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden bg-vfs-blue text-white py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000" 
            alt="Travel" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vfs-blue/80 to-vfs-blue" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-vfs-gold mb-4">VFS Global for Individuals</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
              Welcome to VFS Global
            </h1>
            
            {/* Selection Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden text-slate-800">
              <div className="flex flex-wrap border-b border-slate-100">
                {tabs.map((tab, idx) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 px-4 py-4 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === idx ? 'border-vfs-blue text-vfs-blue bg-slate-50' : 'border-transparent text-slate-400 hover:text-vfs-blue'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                  <div className="flex flex-col items-start w-full md:w-auto">
                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2">I'm applying from</label>
                    <select className="w-full md:w-64 p-3 border border-slate-200 rounded outline-none focus:border-vfs-blue text-sm font-semibold">
                      <option>Select Country / Region</option>
                      <option>United Kingdom</option>
                      <option>USA</option>
                      <option>India</option>
                    </select>
                  </div>
                  
                  <span className="text-sm font-bold text-slate-400 mt-6">and I'm going to</span>
                  
                  <div className="flex flex-col items-start w-full md:w-auto">
                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2">Select Country</label>
                    <select className="w-full md:w-64 p-3 border border-slate-200 rounded outline-none focus:border-vfs-blue text-sm font-semibold">
                      <option>Select Country</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-vfs-light p-4 rounded-lg mb-8 flex items-center justify-center space-x-2">
                  <span className="text-[13px] italic text-slate-600">Every journey deserves protection! Find your <span className="font-bold text-vfs-blue">Travel Medical Insurance</span> solution today.</span>
                  <a href="#" className="text-[13px] font-bold text-vfs-gold hover:underline">Get now →</a>
                </div>
                
                <button className="bg-white border-2 border-vfs-gold text-vfs-gold px-12 py-3 rounded font-bold text-sm hover:bg-vfs-gold hover:text-white transition-all uppercase tracking-widest">
                  Take Me To The Website →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200" alt="Service" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-vfs-blue mb-1">Apply for your visa from the comfort of your home or office with</p>
                <h3 className="text-2xl font-bold text-vfs-blue mb-2">Visa At Your Doorstep</h3>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-vfs-gold" /> Visa submission process</span>
                  <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-vfs-gold" /> Passport collection and delivery</span>
                  <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-vfs-gold" /> Biometric information</span>
                </div>
              </div>
            </div>
            <button className="bg-vfs-gold text-white px-8 py-3 rounded font-bold text-sm hover:bg-vfs-blue transition-all uppercase tracking-widest">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Optional Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-vfs-blue mb-4 leading-tight">
              Enhance your application journey with our optional services designed for your convenience and comfort.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              title="Form Filling" 
              description="Get end-to-end assistance in completing your visa application form correctly with our Form Filling service." 
              image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
              delay={0.1}
            />
            <ServiceCard 
              title="Premium Lounge Service" 
              description="Get personalised assistance and comfort while submitting your visa application with our Premium Lounge service." 
              image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
              delay={0.2}
            />
            <ServiceCard 
              title="SMS Alerts Service" 
              description="Stay updated on the progress of your visa application with our SMS Alerts service." 
              image="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800"
              delay={0.3}
            />
            <ServiceCard 
              title="Courier Service" 
              description="We deliver your passport and documents to your doorstep with our Courier service." 
              image="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=800"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Footprint Section */}
      <section className="py-24 bg-vfs-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 grayscale pointer-events-none">
          <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000" alt="World Map" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-bold text-vfs-gold uppercase tracking-[0.3em] mb-4">Footprint</p>
            <h2 className="text-4xl font-bold text-vfs-blue mb-6">
              Since 2001, we have processed over <span className="text-vfs-gold">533.05 million transactions*</span>
            </h2>
            <p className="text-[11px] text-slate-400 mb-6 font-semibold">* Comprised of 333.5 million transactions by VFS Global and 199.5 million transactions by CIX Citizen Experience</p>
            <a href="#" className="text-vfs-gold font-bold text-sm hover:underline flex items-center">
              We work globally, click on the link to find out more →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-5xl font-bold text-vfs-gold mb-2 tracking-tighter">4027</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Application Centres</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-vfs-gold mb-2 tracking-tighter">167</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Countries of Operation</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-vfs-gold mb-2 tracking-tighter">70</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Client Governments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Testimonials</p>
              <h2 className="text-4xl font-bold text-vfs-blue">What our customers say about us</h2>
            </div>
            <div className="flex space-x-2">
              <button className="p-3 rounded-full border border-slate-200 hover:bg-vfs-blue hover:text-white transition-all"><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-3 rounded-full border border-slate-200 hover:bg-vfs-blue hover:text-white transition-all"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="text-vfs-gold mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3601 14 14.017 12.6569 14.017 11V8H20.017V14H22.017V21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.91241 16 4.01697 16H7.01697V14H5.01697C3.36012 14 2.01697 12.6569 2.01697 11V8H8.01697V14H10.017V21H2.01697Z" /></svg>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-vfs-blue">{t.name}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-vfs-blue mb-16">Featured Insights</h2>
          
          <div className="space-y-12 mb-16">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row border border-slate-100 group">
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                  <img src={insight.image} alt={insight.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:w-2/3 p-12 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-vfs-blue mb-6 group-hover:text-vfs-gold transition-colors">{insight.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">{insight.desc}</p>
                  <a href="#" className="text-vfs-gold font-bold text-sm hover:underline">Continue reading →</a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="border-2 border-vfs-blue text-vfs-blue px-12 py-3 rounded font-bold text-sm hover:bg-vfs-blue hover:text-white transition-all uppercase tracking-widest">
              Visit our insights page for more →
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Selection Box */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-vfs-blue mb-12">Need information on visas, evisas or permits?</h2>
          
          <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-start w-full md:w-auto">
                <label className="text-[11px] font-bold text-slate-400 uppercase mb-2">I'm applying from</label>
                <select className="w-full md:w-64 p-3 border border-slate-200 rounded outline-none focus:border-vfs-blue text-sm font-semibold">
                  <option>Select Country / Region</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                  <option>India</option>
                </select>
              </div>
              
              <span className="text-sm font-bold text-slate-400 mt-6 md:mt-6">and I'm going to</span>
              
              <div className="flex flex-col items-start w-full md:w-auto">
                <label className="text-[11px] font-bold text-slate-400 uppercase mb-2">Select Country</label>
                <select className="w-full md:w-64 p-3 border border-slate-200 rounded outline-none focus:border-vfs-blue text-sm font-semibold">
                  <option>Select Country</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Canada</option>
                </select>
              </div>

              <button className="w-full md:w-auto mt-6 bg-vfs-gold text-white px-10 py-3 rounded font-bold text-sm hover:bg-vfs-blue transition-all uppercase tracking-widest">
                Go
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
