import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

export default function ServiceCard({ title, description, image, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-vfs-gold text-vfs-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Service
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-vfs-blue mb-3 group-hover:text-vfs-gold transition-colors">{title}</h3>
        <p className="text-slate-600 text-[13px] leading-relaxed mb-4">
          {description}
        </p>
        <button className="text-[12px] font-bold text-vfs-blue hover:text-vfs-gold flex items-center transition-colors">
          Learn More
          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
