import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { 
  Download, Share2, CheckCircle2, XCircle, 
  TrendingUp, Award, BookOpen, ExternalLink, MessageCircle,
  Linkedin, Github, Twitter
} from 'lucide-react';
import { CandidateData, SKILLS } from '../types';

interface ResultProps {
  candidateData: CandidateData;
}

export default function Result({ candidateData }: ResultProps) {
  const hasCelebrated = useRef(false);

  useEffect(() => {
    if (candidateData.status === 'accepted' && !hasCelebrated.current) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#FFFFFF', '#000000']
      });
      hasCelebrated.current = true;
    }
  }, [candidateData.status]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Header
    doc.setFillColor(250, 204, 21); // Yellow-400
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text('ASSESSMENT PORTAL', 105, 25, { align: 'center' });
    
    // Content
    doc.setFontSize(16);
    doc.setTextColor(51, 65, 85); // Slate-700
    doc.text('OFFICIAL ASSESSMENT ACCEPTANCE', 105, 55, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 75);
    doc.text(`Candidate Name: ${candidateData.fullName}`, 20, 85);
    doc.text(`Assessment Score: ${candidateData.assessmentScore}%`, 20, 95);
    
    const bodyText = `
Dear ${candidateData.fullName},

It is with great pleasure that we officially welcome you to the ASSESSMENT collective. 

Following a rigorous evaluation of your technical capabilities, professional experience, and creative potential, we are pleased to confirm your acceptance as an Elite Member of our innovation collective. Your impressive assessment score of ${candidateData.assessmentScore}% demonstrates the high level of expertise and dedication we value.

At ASSESSMENT, we are committed to pushing the boundaries of what is possible in the digital landscape. We don't just build software; we pioneer transformative solutions that impact people globally. As part of our team, you will be integral to our mission of delivering excellence through collaborative innovation.

You will soon receive a comprehensive onboarding package via email, which will detail your initial project assignments, team structure, and access credentials for our private development repositories.

We are excited about the unique contributions you will bring to our team and look forward to building the future of technology together.

Welcome to the forefront of innovation.

Sincerely,

Philemon Osei
Founder & CEO
Drenchack Tech Company (DTC)
    `;
    
    const splitText = doc.splitTextToSize(bodyText, 170);
    doc.text(splitText, 20, 110);
    
    // Signature placeholder
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.line(20, 240, 80, 240);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Philemon Osei', 20, 246);
    doc.setFont("helvetica", "normal");
    doc.text('Founder & CEO, ASSESSMENT', 20, 252);
    
    doc.save(`ASSESSMENT_Letter_${candidateData.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const shareToWhatsApp = () => {
    const text = `I'm excited to announce that I have been accepted as a member at Drenchack Tech Company (DTC)! 🚀 Score: ${candidateData.assessmentScore}% #DTC #TechCareer`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getRoadmapForSkill = (skillId: string) => {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) return null;
    return (
      <div key={skillId} className="premium-card p-6 space-y-4">
        <h4 className="font-bold text-slate-900 border-b border-slate-50 pb-2">{skill.name} Roadmap</h4>
        <ul className="space-y-3">
          {skill.techStack.map((tech, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-100">
                {idx + 1}
              </div>
              {tech} Proficiency
            </li>
          ))}
          <li className="pt-2 flex items-center gap-2 text-xs text-primary-dark font-bold underline cursor-pointer hover:opacity-80 transition-opacity">
            <BookOpen className="w-3 h-3" /> View Learning Resources
          </li>
        </ul>
      </div>
    );
  };

  if (candidateData.status === 'rejected') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="premium-card max-w-xl w-full overflow-hidden"
        >
          <div className="bg-slate-50/50 p-12 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Application Status</h2>
              <p className="text-slate-500">
                Thank you for your interest in DTC. Your current talent profile does not meet our immediate requirements.
              </p>
            </div>
          </div>
          <div className="p-12 pt-0 space-y-8">
             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-primary-dark" /> Growth Feedback
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  We highly value your dedication. We encourage you to further specialize in your choice area and build more documented projects. Excellence is a journey, not a destination.
                </p>
             </div>
             <button 
               onClick={() => window.location.reload()}
               className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
             >
               Return to Main Portal
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-auto select-none">
      <div className="h-2 bg-primary w-full" />
      
      <div className="max-w-6xl mx-auto w-full p-6 md:p-16 space-y-12">
        {/* Success Banner */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-10 md:p-16 rounded-[3rem] shadow-premium border border-slate-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">
              Talent Assessment Passed 🎉
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Welcome to the Team, <br />
              <span className="text-primary-dark">{candidateData.fullName.split(' ')[0]}</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
              You are now an official member of Drenchack Tech Company. Your technical score of <span className="text-slate-900 font-bold">{candidateData.assessmentScore}%</span> placed you in our elite candidate bracket.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <button 
                onClick={generatePDF}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center gap-2 shadow-2xl shadow-slate-200 hover:-translate-y-1 transition-all"
              >
                <Download className="w-5 h-5" /> Download Onboarding Letter
              </button>
              <button 
                onClick={shareToWhatsApp}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-sm border border-slate-100 hover:bg-slate-50 transition-all"
              >
                <Share2 className="w-5 h-5" /> Share Achievement
              </button>
            </div>
          </div>

          <div className="md:w-64 flex flex-col items-center gap-6 relative z-10">
            <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center p-4 shadow-premium border-4 border-primary">
              <span className="text-5xl font-black text-slate-900 leading-none">{candidateData.assessmentScore}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">DTC Score</span>
            </div>
            <div className="px-6 py-2 bg-slate-900 text-primary rounded-xl text-[10px] font-bold uppercase tracking-widest text-center">
              Elite Tier Verified
            </div>
          </div>
          
          {/* Subtle bg */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <header className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" /> Your Growth Roadmap
              </h3>
              <p className="text-slate-500 font-medium">Custom learning paths generated specifically for your selected career trajectories.</p>
            </header>
            
            <div className="grid md:grid-cols-2 gap-8">
              {candidateData.selectedSkills.map(skillId => getRoadmapForSkill(skillId))}
            </div>

            <div className="premium-card p-10 bg-slate-900 text-white space-y-6">
              <h3 className="text-xl font-bold tracking-tight">Onboarding Instructions</h3>
              <p className="text-slate-400 leading-relaxed">
                An invitation to our private development workspace and communication channels will be sent to <span className="text-white font-bold">{candidateData.email}</span>. Please authorize the request within 48 hours.
              </p>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Profile verification complete</span>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="premium-card p-8 space-y-8">
              <h4 className="font-bold text-lg text-slate-900">Talent Identity</h4>
              <div className="space-y-6">
                {[
                  { label: "Talent ID", val: `DTC-${Math.random().toString().substring(2, 6)}` },
                  { label: "Region", val: candidateData.country },
                  { label: "Focus", val: candidateData.focusArea || "Innovation" },
                  { label: "Tier", val: "L1 Member" }
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-1 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 pt-4">
                <Linkedin className="w-6 h-6 text-slate-300 hover:text-primary transition-all cursor-pointer" />
                <Github className="w-6 h-6 text-slate-300 hover:text-primary transition-all cursor-pointer" />
                <Twitter className="w-6 h-6 text-slate-300 hover:text-primary transition-all cursor-pointer" />
              </div>
            </div>

            <div className="premium-card p-8 bg-primary/10 border-primary/20 space-y-4">
              <h4 className="font-bold text-slate-900">Join the Private Community</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">Connect with other elite developers and innovators in our closed ecosystem.</p>
              <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                Access Member Space <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
