/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Welcome from './components/Welcome';
import AssessmentForm from './components/AssessmentForm';
import Processing from './components/Processing';
import Result from './components/Result';
import AdminDashboard from './components/AdminDashboard';
import { CandidateData } from './types';

type AppStage = 'welcome' | 'form' | 'processing' | 'result' | 'admin' | 'documentation';

import PortalLayout from './components/PortalLayout';
import Documentation from './components/Documentation';

const STEPS = [
  "Information",
  "Commitment",
  "Career",
  "Assessment",
  "Portfolio",
  "Confirm"
];

export default function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [currentStep, setCurrentStep] = useState(0);
  const [candidateName, setCandidateName] = useState("Candidate");
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);

  // Check for admin path in URL
  useEffect(() => {
    const path = window.location.hash;
    if (path === '#admin') {
      setStage('admin');
    }
  }, []);

  const handleStartAssessment = () => {
    setStage('form');
  };

  const handleViewDocumentation = () => {
    setStage('documentation');
  };

  const handleBackToPortal = () => {
    setStage('welcome');
  };

  const handleFormSubmit = (data: CandidateData) => {
    setCandidateData(data);
    setStage('processing');
  };

  const handleProcessingComplete = (status: 'accepted' | 'rejected') => {
    if (candidateData) {
      setCandidateData({ ...candidateData, status });
    }
    setStage('result');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-primary/30 font-sans">
      <AnimatePresence mode="wait">
        {stage === 'documentation' && (
          <motion.div
            key="documentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Documentation onBack={handleBackToPortal} />
          </motion.div>
        )}

        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Welcome onStart={handleStartAssessment} onViewDocs={handleViewDocumentation} />
          </motion.div>
        )}

        {stage === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <PortalLayout 
              currentStep={currentStep} 
              steps={STEPS}
              candidateName={candidateName}
            >
              <AssessmentForm 
                onSubmit={handleFormSubmit} 
                onStepChange={setCurrentStep}
                onNameChange={setCandidateName}
                currentStep={currentStep}
              />
            </PortalLayout>
          </motion.div>
        )}

        {stage === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Processing 
              candidateData={candidateData} 
              onComplete={handleProcessingComplete} 
            />
          </motion.div>
        )}

        {stage === 'result' && candidateData && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Result candidateData={candidateData} />
          </motion.div>
        )}

        {stage === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating help or info can be added here */}
    </div>
  );
}

