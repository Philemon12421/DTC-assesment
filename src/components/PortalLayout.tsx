import React from 'react';
import { motion } from 'motion/react';
import { User, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface PortalLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  steps: string[];
  candidateName?: string;
  candidateId?: string;
}

export default function PortalLayout({ 
  children, 
  currentStep, 
  steps,
  candidateName = "Candidate",
  candidateId = "DTC-9921"
}: PortalLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-20 border-b border-slate-100 flex items-center justify-between px-6 md:px-10 flex-shrink-0 bg-white z-30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm border border-yellow-200">
              <img
                src="/logo 2.png"
                alt="Drenchack Tech Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-lg leading-tight tracking-tighter text-slate-900">DRENCHACK TECH COMPANY</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Innovation & Excellence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex flex-col items-end hidden xs:flex">
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Deadline</span>
            <span className="text-sm font-mono text-red-500 font-bold">23h : 41m</span>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden xs:block" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-bold text-slate-900">{candidateName}</p>
              <p className="text-xs text-slate-500">ID: {candidateId}</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-primary flex items-center justify-center text-slate-400 overflow-hidden">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Steps Navigation - Hidden on small screens */}
        <aside className="w-72 bg-slate-50 border-r border-slate-100 p-8 hidden lg:flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div key={step} className={cn(
                  "flex items-center gap-4 transition-opacity",
                  !isActive && !isCompleted && "opacity-40"
                )}>
                  <div className={cn(
                    "step-circle",
                    isCompleted && "step-circle-completed",
                    isActive && "step-circle-active",
                    !isActive && !isCompleted && "step-circle-inactive"
                  )}>
                    {isCompleted ? <Check className="w-4 h-4" /> : (index + 1).toString().padStart(2, '0')}
                  </div>
                  <span className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-slate-900 font-bold" : "text-slate-600"
                  )}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"
          >
            <p className="text-[10px] font-bold text-primary-dark uppercase tracking-widest mb-2">Wisdom</p>
            <p className="text-xs italic leading-relaxed text-slate-600 font-medium">
              "We don't just build software, we build people. Excellence is our only standard."
            </p>
          </motion.div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 bg-slate-50/30 overflow-auto">
          <div className="max-w-4xl mx-auto min-h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
