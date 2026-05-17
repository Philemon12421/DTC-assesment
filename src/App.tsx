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
import PortalLayout from './components/PortalLayout';
import Documentation from './components/Documentation';
import { CandidateData } from './types';

type AppStage =
  | 'welcome'
  | 'form'
  | 'processing'
  | 'result'
  | 'admin'
  | 'documentation';

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
  const [candidateData, setCandidateData] =
    useState<CandidateData | null>(null);

  useEffect(() => {
    const path = window.location.hash;
    if (path === '#admin') {
      setStage('admin');
    }

    // Enable vertical scrolling
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';

    return () => {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
    };
  }, []);

  const handleStartAssessment = () => setStage('form');
  const handleViewDocumentation = () => setStage('documentation');
  const handleBackToPortal = () => setStage('welcome');

  const handleFormSubmit = (data: CandidateData) => {
    setCandidateData(data);
    setStage('processing');
  };

  const handleProcessingComplete = (
    status: 'accepted' | 'rejected'
  ) => {
    if (candidateData) {
      setCandidateData({
        ...candidateData,
        status,
      });
    }
    setStage('result');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-white font-sans selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {stage === 'documentation' && (
          <motion.div
            key="documentation"
            className="min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Documentation onBack={handleBackToPortal} />
          </motion.div>
        )}

        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            className="min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Welcome
              onStart={handleStartAssessment}
              onViewDocs={handleViewDocumentation}
            />
          </motion.div>
        )}

        {stage === 'form' && (
          <motion.div
            key="form"
            className="min-h-screen w-full overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            className="min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            className="min-h-screen w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <Result candidateData={candidateData} />
          </motion.div>
        )}

        {stage === 'admin' && (
          <motion.div
            key="admin"
            className="min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
