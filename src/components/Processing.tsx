import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, ShieldCheck, Search, Activity, Cpu } from 'lucide-react';
import { CandidateData } from '../types';

interface ProcessingProps {
  candidateData: CandidateData | null;
  onComplete: (status: 'accepted' | 'rejected') => void;
}

export default function Processing({ candidateData, onComplete }: ProcessingProps) {
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState("Initializing Review...");

  useEffect(() => {
    // Simulate review process
    const duration = 15000; // 15 seconds
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const actions = [
      "Securing connection...",
      "Analyzing profile integrity...",
      "Validating credentials...",
      "Evaluating tech stack...",
      "Calculating team dynamic...",
      "Finalizing talent report..."
    ];

    const actionTimer = setInterval(() => {
      setCurrentAction(prev => {
        const currentIndex = actions.indexOf(prev);
        return actions[(currentIndex + 1) % actions.length];
      });
    }, 2500);

    const timeout = setTimeout(() => {
      const isAccepted = (candidateData?.assessmentScore || 0) > 75;
      onComplete(isAccepted ? 'accepted' : 'rejected');
    }, duration);

    return () => {
      clearInterval(timer);
      clearInterval(actionTimer);
      clearTimeout(timeout);
    };
  }, [candidateData, onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 font-sans">
      <div className="max-w-2xl w-full space-y-16">
        {/* Animated Icon Area */}
        <div className="relative flex justify-center">
          <div className="w-40 h-40 relative">
            {/* outer rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-slate-100 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-2 border-primary/20 rounded-full border-dashed"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-premium border border-slate-100 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary-dark animate-spin" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reviewing Your Talent Profile</h2>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            DTC criteria are high. We are currently evaluating your technical competence and cultural alignment.
          </p>
        </div>

        {/* Progress System */}
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none translate-y-[1px]">
                  Current Status
                </span>
              </div>
              <span className="text-2xl font-mono font-bold text-slate-900 leading-none">
                {Math.round(progress)}%
              </span>
            </div>
            
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <span className="text-sm font-semibold tracking-wide">{currentAction}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-10 flex justify-center gap-12 border-t border-slate-100">
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encrypted</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Cpu className="w-5 h-5 text-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Scoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
