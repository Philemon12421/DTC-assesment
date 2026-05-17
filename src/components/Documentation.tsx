import { motion } from 'motion/react';
import { ChevronLeft, Zap, Target, Shield, Globe, Users, BookOpen, Code, Terminal, Cpu, Info, CheckCircle2 } from 'lucide-react';
import { SKILLS } from '../types';

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
          <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm border border-yellow-200">
              <img
                src="/logo 2.png"
                alt="Drenchack Tech Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tighter text-slate-900 leading-none">DRENCHACK TECH COMPANY</h1>
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
          className="space-y-24"
        >
          <header className="space-y-4">
            <span className="px-3 py-1 bg-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-dark">Official Guide</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">The DTC Blueprint</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl">Everything you need to know about joining the elite innovation force and our technical expectations.</p>
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

          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Official Roadmaps</h3>
              <p className="text-lg text-slate-500 font-medium">Detailed progression paths for every technical career track at DTC.</p>
            </div>

            <div className="grid gap-10">
              {SKILLS.filter(s => s.roadmap).map((skill, sIdx) => (
                <motion.div 
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-premium"
                >
                  <div className="p-10 bg-slate-900 text-white">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Technical Roadmap</span>
                        <h4 className="text-3xl font-black">{skill.name}</h4>
                      </div>
                      <div className="p-4 bg-white/10 rounded-2xl">
                        <Code className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10 grid md:grid-cols-3 gap-8">
                    {/* Foundation */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Foundation</span>
                      </div>
                      <ul className="space-y-4">
                        {skill.roadmap?.foundation.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-slate-200 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Intermediate */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Intermediate</span>
                      </div>
                      <ul className="space-y-4">
                        {skill.roadmap?.intermediate.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-slate-200 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advanced */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Elite / Advanced</span>
                      </div>
                      <ul className="space-y-4">
                        {skill.roadmap?.advanced.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-primary p-16 rounded-[4rem] text-center space-y-8 shadow-2xl shadow-primary/30">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Ready to join the elite?</h3>
              <p className="text-slate-800 font-bold text-xl max-w-xl mx-auto">Your technical journey starts with our immersive assessment process.</p>
            </div>
            <button 
              onClick={onBack}
              className="px-12 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95"
            >
              Start Talent Assessment
            </button>
          </div>
        </motion.div>
      </main>

      <footer className="py-16 border-t border-slate-100 text-center space-y-6">
        <div className="flex justify-center gap-8">
          <Terminal className="w-6 h-6 text-slate-200" />
          <Code className="w-6 h-6 text-slate-200" />
          <BookOpen className="w-6 h-6 text-slate-200" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2026 Drenchack Tech Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
