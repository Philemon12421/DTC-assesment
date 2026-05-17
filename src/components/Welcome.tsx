import { motion } from 'motion/react';
import { ChevronRight, Globe, Code, Shield, Lightbulb, Users, Laptop } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  onViewDocs: () => void;
}

export default function Welcome({ onStart, onViewDocs }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-auto select-none">
      {/* Top Banner */}
      <div className="h-2 bg-primary w-full shadow-sm" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-4xl w-full text-center relative z-10 space-y-12">
          {/* Logo Area */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 bg-primary p-4 rounded-[2.5rem] shadow-2xl shadow-primary/30 flex items-center justify-center border-4 border-white transition-transform hover:scale-110 duration-500">
              <img 
                src="https://kommodo.ai/i/D9EbP1JE0Xal0CY6cqRu" 
                alt="DTC Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-sm font-bold text-primary-dark uppercase tracking-[0.4em]">Integrated Innovation</h2>
              <div className="w-12 h-1 bg-primary rounded-full" />
            </div>
          </motion.div>

          {/* Headline Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[0.95]">
              Innovation <br />
              <span className="text-primary-dark inline-block relative">
                Unbound.
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-4 bg-primary/20 -z-10" 
                />
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              Drenchack Tech Company is a global innovation firm. We build high-impact software, solve complex problems, and develop elite talent.
            </p>
          </motion.div>

          {/* Action Area */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center gap-8 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto group relative px-12 py-5 bg-primary hover:bg-primary-hover text-slate-900 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Join DTC Collective
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={onViewDocs}
                className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-lg border-2 border-slate-100 hover:border-primary transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                View Documentation
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 pt-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Secure Portal</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Global Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Elite Talent</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Corporate Footer (Partial) */}
      <footer className="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2024 Drenchack Tech Company. All Rights Reserved.</p>
        <div className="flex gap-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Candidate Terms</span>
        </div>
      </footer>
    </div>
  );
}
