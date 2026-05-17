import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Users, UserCheck, UserX, Search, Download, 
  Filter, MoreVertical, LayoutDashboard, Database,
  ArrowUpRight, Mail, Phone, MapPin, ExternalLink
} from 'lucide-react';
import { CandidateData } from '../types';
import { cn } from '../lib/utils';

// Mock data for dashboard visualization
const MOCK_SUBMISSIONS: (CandidateData & { id: string })[] = [
  {
    id: "1",
    fullName: "Alice Smith",
    email: "alice@example.com",
    phone: "+1 555 0101",
    country: "Canada",
    education: "BSc Computer Science",
    experience: "2",
    currentSkills: "React, CSS",
    desiredSkills: "Node.js",
    whyJoin: "Passionate about innovation.",
    careerGoal: "Lead Frontend",
    focusArea: "Software",
    linkedIn: "#",
    github: "#",
    twitter: "#",
    selectedSkills: ["frontend", "ui-ux"],
    assessmentScore: 88,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  },
  {
    id: "2",
    fullName: "Bob Johnson",
    email: "bob@tech.com",
    phone: "+1 555 0102",
    country: "UK",
    education: "Self-taught",
    experience: "5",
    currentSkills: "Java, Python",
    desiredSkills: "AI",
    whyJoin: "Remote work advocate.",
    careerGoal: "Fullstack Eng",
    focusArea: "AI",
    linkedIn: "#",
    github: "#",
    twitter: "#",
    selectedSkills: ["backend", "ai-ml"],
    assessmentScore: 92,
    submittedAt: new Date().toISOString(),
    status: 'accepted'
  }
];

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      const matchesSearch = s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || s.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [submissions, searchTerm, filter]);

  const stats = useMemo(() => ({
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    accepted: submissions.filter(s => s.status === 'accepted').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  }), [submissions]);

  const handleStatusChange = (id: string, status: 'accepted' | 'rejected') => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "dtc_submissions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 p-8 flex flex-col gap-10">
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
            <span className="font-black text-xl tracking-tighter text-slate-900 block leading-none">DRENCHACK TECH COMPANY</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Admin Command</span>
          </div>
        </div>

        <nav className="space-y-2">
          <div className="bg-primary/10 text-primary-dark px-4 py-3 rounded-2xl font-bold flex items-center gap-3 border border-primary/20">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </div>
          <div className="text-slate-400 px-4 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-50 hover:text-slate-600 cursor-pointer transition-all">
            <Users className="w-5 h-5" /> All Candidates
          </div>
          <div className="text-slate-400 px-4 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-50 hover:text-slate-600 cursor-pointer transition-all">
            <Database className="w-5 h-5" /> Talent Pool
          </div>
          <div className="text-slate-400 px-4 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-50 hover:text-slate-600 cursor-pointer transition-all">
            <Mail className="w-5 h-5" /> Communication
          </div>
        </nav>

        <div className="mt-auto premium-card p-5 bg-slate-900 text-white">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Systems Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold font-mono">DTC-NODE-ACTIVE</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 px-10 flex justify-between items-center flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Talent Assessment Overview</h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Real-time application tracking</p>
          </div>
          <div className="flex items-center gap-6">
             <button 
               onClick={exportData}
               className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
             >
               <Download className="w-4 h-4" /> Export Analytics
             </button>
             <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
               <Database className="w-5 h-5" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-10 space-y-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Recieved", val: stats.total, icon: Users, color: "bg-blue-50 text-blue-600" },
              { label: "Under Review", val: stats.pending, icon: Search, color: "bg-yellow-50 text-yellow-600" },
              { label: "Talent Accepted", val: stats.accepted, icon: UserCheck, color: "bg-green-50 text-green-600" },
              { label: "Talent Rejected", val: stats.rejected, icon: UserX, color: "bg-red-50 text-red-600" }
            ].map(stat => (
              <div key={stat.label} className="premium-card p-6 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${stat.color} border border-current/10`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-200" />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 tabular-nums">{stat.val}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="premium-card overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-50/30">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary-dark transition-colors" />
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by candidate name..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-dark outline-none text-sm font-medium placeholder:text-slate-300 transition-all bg-white"
                />
              </div>
              
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/50">
                {(['all', 'pending', 'accepted', 'rejected'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === f 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Identification</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Career Tracks</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Score %</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current State</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredSubmissions.map(candidate => (
                    <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400">
                            {candidate.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{candidate.fullName}</p>
                            <div className="flex items-center gap-2">
                               <Mail className="w-3 h-3 text-slate-300" />
                               <p className="text-xs text-slate-400 font-medium">{candidate.email}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.selectedSkills.map(s => (
                            <span key={s} className="px-2.5 py-1 bg-white text-[9px] font-bold text-slate-500 rounded-lg border border-slate-100 uppercase tracking-wider">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-black text-slate-900">{candidate.assessmentScore}%</div>
                          <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                candidate.assessmentScore > 85 ? "bg-green-400" : "bg-primary"
                              )} 
                              style={{ width: `${candidate.assessmentScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 border",
                          candidate.status === 'accepted' ? 'bg-green-50 text-green-600 border-green-100' :
                          candidate.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                          'bg-yellow-50 text-yellow-600 border-yellow-100'
                        )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full animate-pulse",
                            candidate.status === 'accepted' ? 'bg-green-500' :
                            candidate.status === 'rejected' ? 'bg-red-500' :
                            'bg-yellow-500'
                          )} />
                          {candidate.status}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleStatusChange(candidate.id, 'accepted')}
                            className="w-10 h-10 rounded-xl bg-green-50 text-green-600 border border-green-100 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm"
                            title="Accept Candidate"
                          >
                            <UserCheck className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(candidate.id, 'rejected')}
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Reject Candidate"
                          >
                            <UserX className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
