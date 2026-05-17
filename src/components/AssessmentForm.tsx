import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, ChevronLeft, Upload, Link as LinkIcon, 
  Linkedin, Github, Twitter, CheckCircle2, AlertCircle, Clock,
  Code, Info, X, Zap, Target, BookOpen, HelpCircle
} from 'lucide-react';
import { CandidateData, SKILLS, Skill, ROLE_QUESTIONS, PORTAL_FAQS, FAQItem } from '../types';
import { cn } from '../lib/utils';

interface AssessmentFormProps {
  onSubmit: (data: CandidateData) => void;
  onStepChange: (step: number) => void;
  onNameChange: (name: string) => void;
  currentStep: number;
}

export default function AssessmentForm({ 
  onSubmit, 
  onStepChange, 
  onNameChange,
  currentStep 
}: AssessmentFormProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeSkillInfo, setActiveSkillInfo] = useState<Skill | null>(null);
  const [activeFaq, setActiveFaq] = useState<FAQItem[] | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue } = useForm<CandidateData>({
    defaultValues: {
      status: 'pending',
      assessmentScore: 0,
    }
  });

  const fullName = watch('fullName');

  useEffect(() => {
    if (fullName) {
      onNameChange(fullName);
    }
  }, [fullName, onNameChange]);

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await trigger(fields as any);
    if (isValid) {
      if (currentStep === 2 && selectedSkills.length === 0) {
        alert("Please select at least one skill.");
        return;
      }
      onStepChange(currentStep + 1);
    }
  };

  const prevStep = () => {
    onStepChange(currentStep - 1);
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0: return ['fullName', 'email', 'phone', 'country', 'education', 'experience', 'currentSkills', 'desiredSkills', 'whyJoin', 'careerGoal', 'focusArea', 'linkedIn', 'github', 'twitter'];
      case 1: return ['whyJoinDTC']; // Actually commitment questions can be mapped to custom fields
      default: return [];
    }
  };

  const toggleSkill = (id: string) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(prev => prev.filter(s => s !== id));
    } else {
      if (selectedSkills.length < 3) {
        setSelectedSkills(prev => [...prev, id]);
      }
    }
  };

  const onFormSubmit = (data: CandidateData) => {
    // Calculate score based on assessment (Step 4)
    let score = Math.floor(Math.random() * 40) + 60; // Mock score for now
    
    const finalData = {
      ...data,
      selectedSkills,
      assessmentScore: score,
      submittedAt: new Date().toISOString(),
    };
    
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    onSubmit(finalData);
  };

  const getDynamicQuestions = useMemo(() => {
    return selectedSkills.flatMap(skillId => ROLE_QUESTIONS[skillId] || []);
  }, [selectedSkills]);

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div 
              key="step0"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-accent/50 border border-primary/20 p-6 md:p-8 rounded-2xl mb-8 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Candidate Information</h2>
                  <p className="text-slate-600 font-medium">Please provide your official professional details.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setActiveFaq(PORTAL_FAQS.filter(f => f.section === 'information'))}
                  className="p-3 bg-white/80 rounded-2xl text-slate-400 hover:text-primary-dark transition-colors border border-slate-100 shadow-sm"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input 
                    {...register('fullName', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span className="text-xs text-red-500">Required field</span>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input 
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input 
                    {...register('phone', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Country</label>
                  <input 
                    {...register('country', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="United States"
                  />
                </div>
              </div>

              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Highest Education</label>
                      <input {...register('education', { required: true })} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Experience (Years)</label>
                      <input {...register('experience', { required: true })} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                    </div>
                 </div>

                 <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800">Professional Accounts</h3>
                    <p className="text-xs text-slate-500">Creating these professional accounts is compulsory for all DTC members.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input {...register('linkedIn', { required: true })} placeholder="LinkedIn URL" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm" />
                      </div>
                      <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input {...register('github', { required: true })} placeholder="GitHub URL" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm" />
                      </div>
                      <div className="relative">
                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input {...register('twitter', { required: true })} placeholder="X URL" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm" />
                      </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-primary/20 border border-primary/40 p-6 md:p-8 rounded-[2rem] mb-8 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Team Commitment</h2>
                  <p className="text-slate-700 font-medium">DTC is built on dedication and mutual respect.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setActiveFaq(PORTAL_FAQS.filter(f => f.section === 'commitment'))}
                  className="p-3 bg-white/20 rounded-2xl text-slate-900 hover:bg-white/40 transition-colors border border-black/5 shadow-sm"
                >
                  <HelpCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {[
                  "Are you committed to attending meetings and team activities consistently?",
                  "Are you eager to share ideas and contribute?",
                  "Will you respect all members equally regardless of skill level?",
                  "Will you treat DTC like your own company?",
                  "Are you willing to sacrifice time and effort for growth?",
                  "Are you comfortable working remotely?"
                ].map((q, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
                    <p className="font-semibold text-slate-800">{i + 1}. {q}</p>
                    <div className="flex gap-4">
                      {["Yes", "Maybe", "No"].map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name={`q${i}`} className="w-5 h-5 accent-primary cursor-pointer" required />
                          <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Why should DTC choose you over others?</label>
                  <textarea 
                    {...register('whyJoin', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary min-h-[120px] outline-none"
                    placeholder="Tell us about your unique strengths..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8 h-full"
            >
              <header>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Select Your Career Path</h2>
                <p className="text-slate-500 mt-2">Choose up to <span className="text-primary-dark font-bold">three skills</span> that align with your professional goals.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SKILLS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={cn(
                        "premium-card p-6 relative cursor-pointer group flex flex-col",
                        isSelected && "premium-card-selected ring-4 ring-primary/20"
                      )}
                    >
                      <div className="flex-1" onClick={() => toggleSkill(skill.id)}>
                        {isSelected && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 text-primary"
                          >
                            <CheckCircle2 className="w-6 h-6 fill-primary text-white" />
                          </motion.div>
                        )}
                        
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                          isSelected ? "bg-primary text-white" : "bg-slate-50 group-hover:bg-primary/10 text-slate-400 group-hover:text-primary-dark"
                        )}>
                          <Code className="w-6 h-6" />
                        </div>

                        <h3 className="font-bold text-lg mb-1 text-slate-900">{skill.name}</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">{skill.career}</p>
                        
                        <div className="space-y-1 mb-12">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tech Stack</p>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.techStack.map(tech => (
                              <span key={tech} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 border border-slate-200/50">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSkillInfo(skill);
                        }}
                        className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-dark transition-colors"
                      >
                        <Info className="w-3 h-3" /> Learn More
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-accent/50 border border-primary/20 p-6 rounded-2xl mb-8 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">DTC Assessment Stage</h2>
                  <p className="text-slate-600">Basic aptitude followed by role-specific challenges.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setActiveFaq(PORTAL_FAQS.filter(f => f.section === 'assessment'))}
                  className="p-3 bg-white/80 rounded-2xl text-slate-400 hover:text-primary-dark transition-colors border border-slate-100 shadow-sm"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                {/* General Question */}
                <div className="bg-white p-8 border border-slate-100 rounded-3xl shadow-sm space-y-6 transition-all hover:border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-slate-100">1</div>
                    <p className="font-bold text-lg text-slate-800">Problem Solving</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed pl-11">Imagine you are building a tool for DTC that needs to handle high traffic from multiple countries. Which architecture approach would you prioritize?</p>
                  <div className="space-y-3 pl-11">
                    {[
                      "Client-side processing only",
                      "Distributed Cloud Infrastructure with Load Balancing",
                      "A single powerful local server",
                      "Manual data entry system"
                    ].map(opt => (
                      <label key={opt} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-all">
                        <input type="radio" name="apt1" className="w-5 h-5 accent-primary" />
                        <span className="text-sm font-medium text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Role Specific Questions */}
                {getDynamicQuestions.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 py-4">
                      <Zap className="w-5 h-5 text-primary" />
                      <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Technical Deep Dive</h3>
                    </div>

                    {getDynamicQuestions.map((q, idx) => (
                      <div key={q.id} className="bg-white p-8 border border-slate-100 rounded-3xl shadow-sm space-y-6 transition-all hover:border-primary/20">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-slate-900 flex items-center justify-center font-bold text-xs ring-4 ring-primary/20">{idx + 2}</div>
                          <p className="font-bold text-lg text-slate-800">{q.question}</p>
                        </div>
                        <div className="space-y-3 pl-11">
                          {q.options.map(opt => (
                            <label key={opt} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-all">
                              <input type="radio" name={`dynamic_q_${q.id}`} className="w-5 h-5 accent-primary" />
                              <span className="text-sm font-medium text-slate-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div 
              key="step4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-accent/50 border border-primary/20 p-6 rounded-2xl mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Upload Section</h2>
                <p className="text-slate-600">Show us what you've built. High-quality links are preferred.</p>
              </div>

              <div className="space-y-6">
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:border-primary transition-colors bg-white group">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary-dark group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Upload Portfolio / CV</p>
                    <p className="text-sm text-slate-500">PDF, PNG, JPG (Max 5MB)</p>
                  </div>
                  <input type="file" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-sm cursor-pointer hover:bg-slate-800 transition-colors">
                    Choose File
                  </label>
                </div>

                <div className="grid gap-4">
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input {...register('portfolioUrl')} placeholder="Personal Portfolio Link" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 outline-none" />
                  </div>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input {...register('projectsUrl')} placeholder="Specific Projects Link (Drive, GitHub, etc)" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div 
              key="step5"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 text-center"
            >
              <div className="bg-accent border border-primary/30 p-10 rounded-[2.5rem] space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary-dark" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Are you ready?</h2>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Please review all your details. Once submitted, you cannot change your application until the review cycle ends.
                  </p>
                </div>

                <div className="bg-white/80 p-6 rounded-2xl border border-slate-100 flex items-center justify-between mt-8 max-w-sm mx-auto">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" className="w-6 h-6 accent-primary" required />
                    <span className="font-bold text-slate-800">I am human and dedicated</span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Anti-random submission protection active</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-6 items-center justify-between bg-white z-10">
          <div className="flex flex-col w-full sm:w-auto">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Profile Strength: {Math.round(((currentStep + 1) / 6) * 100)}%
              </span>
            </div>
            <div className="w-full sm:w-64 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
                layoutId="progress-bar"
                initial={false}
                animate={{ width: `${((currentStep + 1) / 6) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 sm:flex-none px-6 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-slate-50 rounded-2xl border border-slate-100"
              >
                Back
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-[2] sm:flex-none px-10 py-4 bg-primary hover:bg-primary-hover rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
              >
                Continue Assessment <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex-[2] sm:flex-none px-12 py-4 bg-primary hover:bg-primary-hover rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Skill Modal */}
      <AnimatePresence>
        {activeSkillInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSkillInfo(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
            >
              <div className="bg-primary p-8 flex justify-between items-start">
                 <div className="space-y-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">Career Path</span>
                    <h3 className="text-3xl font-black text-slate-900">{activeSkillInfo.name}</h3>
                 </div>
                 <button onClick={() => setActiveSkillInfo(null)} className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
                   <X className="w-5 h-5 text-slate-900" />
                 </button>
              </div>
              <div className="p-10 space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Target className="w-5 h-5 text-primary-dark" />
                    <h4>The Role at DTC</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {activeSkillInfo.career} In this track, you will be responsible for building high-performance systems and contributing to the core Drenchack ecosystem.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Zap className="w-5 h-5 text-primary-dark" />
                    <h4>Growth Trajectory</h4>
                  </div>
                  <div className="space-y-3">
                    {activeSkillInfo.techStack.map((tech, i) => (
                      <div key={tech} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 border border-slate-100">{i + 1}</div>
                        <span className="text-sm font-bold text-slate-700">{tech} Mastery</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                    <BookOpen className="w-4 h-4" /> Recommended Resource
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-primary transition-all border border-transparent">
                     <span className="text-sm font-bold text-slate-900">DTC Internal Documentation</span>
                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <button 
                  onClick={() => setActiveSkillInfo(null)}
                  className="w-full py-4 bg-primary text-slate-900 rounded-2xl font-bold shadow-lg shadow-primary/10 hover:bg-primary-hover transition-all"
                >
                  Got it, thanks
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirming && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10 text-center space-y-8"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-primary-dark" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-slate-900">Ready to Launch?</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  You've selected <span className="text-slate-900 font-bold">{selectedSkills.length} career tracks</span>. Your submission will be final and entered into our elite talent review pool.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {selectedSkills.map(sid => (
                    <span key={sid} className="px-3 py-1 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-lg border border-slate-100">
                      {sid}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSubmit(onFormSubmit)}
                  className="w-full py-4 bg-primary text-slate-900 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all"
                >
                  Yes, Submit My Profile
                </button>
                <button 
                  onClick={() => setIsConfirming(false)}
                  className="w-full py-4 bg-white text-slate-500 rounded-2xl font-bold hover:text-slate-900 transition-all"
                >
                  Go Back and Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* FAQ Modal */}
      <AnimatePresence>
        {activeFaq && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFaq(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
            >
              <div className="bg-slate-900 p-8 flex justify-between items-start">
                 <div className="space-y-2">
                    <span className="px-3 py-1 bg-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Need Help?</span>
                    <h3 className="text-2xl font-black text-white">Frequently Asked Questions</h3>
                 </div>
                 <button onClick={() => setActiveFaq(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                   <X className="w-5 h-5 text-white" />
                 </button>
              </div>
              <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
                {activeFaq.map((item, idx) => (
                  <div key={idx} className="space-y-2 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item.question}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-sm">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-8 pt-0">
                <button 
                  onClick={() => setActiveFaq(null)}
                  className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-100"
                >
                  Close Help Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
