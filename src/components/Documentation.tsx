import { motion } from 'motion/react';
import { ChevronLeft, Zap, Target, Shield, Globe, Users, BookOpen, Code, Terminal, Cpu } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export default function Documentation({ onBack }: DocumentationProps) {
  const sections = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: Target,
      content: 'Drenchack Tech Company (DTC) is founded on the principle of innovation unbound. Our mission is to build a global collective of elite talent that creates software solutions for complex real-world problems. We prioritize excellence, creativity, and technical mastery above all else.'
    },
    {
      id: 'values',
      title: 'Core Values',
      icon: Shield,
      content: 'Transparency, meritocracy, and obsessive focus on user experience. At DTC, every voice matters if it is backed by logic and data. We operate as a high-performance unit where mutual respect and continuous learning are the bedrock of our culture.'
    },
    {
      id: 'tracks',
      title: 'Career Tracks',
      icon: Cpu,
      content: 'We offer specialized paths in Frontend, Backend, AI/ML, Cybersecurity, Data Science, and UI/UX Design. Each track is designed to take a member from proficiency to absolute mastery through high-impact projects and mentorship.'
    },
    {
      id: 'remote',
      title: 'Remote Excellence',
      icon: Globe,
      content: 'DTC is a remote-first organization. We leverage cutting-edge collaboration tools to maintain a synchronous workflow across time zones. We value output and quality over physical presence.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 p-2">
            <img src="https://kommodo.ai/i/D9EbP1JE0Xal0CY6cqRu" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tighter text-slate-900 leading-none">DRENCHACK</h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-black">Documentation Center</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Portal
        </button>
      </nav>

      <main className="max-w-4xl mx-auto py-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          <header className="space-y-4">
            <span className="px-3 py-1 bg-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-dark">Official Guide</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">The DTC Blueprint</h2>
            <p className="text-xl text-slate-500 font-medium">Everything you need to know about joining the elite innovation force.</p>
          </header>

          <div className="grid gap-12">
            {sections.map((section, idx) => (
              <motion.section 
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-slate-900 transition-all duration-500">
                    <section.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">{section.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          <div className="bg-slate-900 p-12 rounded-[3.5rem] text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white">Ready to make your mark?</h3>
              <p className="text-slate-400 font-medium text-lg">The talent assessment is open for elite candidates globally.</p>
            </div>
            <button 
              onClick={onBack}
              className="px-10 py-5 bg-primary text-slate-900 rounded-[2rem] font-black text-lg hover:bg-primary-hover transition-all shadow-2xl shadow-primary/20"
            >
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-slate-100 text-center space-y-4">
        <div className="flex justify-center gap-6">
          <Terminal className="w-5 h-5 text-slate-300" />
          <Code className="w-5 h-5 text-slate-300" />
          <BookOpen className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">© 2026 Drenchack Tech Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
