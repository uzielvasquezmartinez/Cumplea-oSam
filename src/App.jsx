import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { birthdayContent } from './data/birthdayContent';

import FloatingPetals from './components/botanical/FloatingPetals';
import HeroScene from './components/scenes/HeroScene';
import BrotherMessage from './components/scenes/BrotherMessage';
import SecretTrigger from './components/scenes/SecretTrigger';
import DivergentGarden from './components/scenes/DivergentGarden';
import CinematicFinale from './components/scenes/CinematicFinale';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('divergent_garden_unlocked') === 'true';
  });

  const [currentView, setCurrentView] = useState('public');

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('divergent_garden_unlocked', 'true');
    setCurrentView('secret');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToPublic = () => {
    setCurrentView('public');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0A0A0D', color: '#FAFAFC', position: 'relative' }}>
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {currentView === 'public' ? (
          <motion.div
            key="public-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          >
            <HeroScene profile={birthdayContent.profile} />
            <BrotherMessage content={birthdayContent.brotherSection} />
            <SecretTrigger
              isUnlocked={isUnlocked}
              onUnlock={handleUnlock}
              triggerData={birthdayContent.secretTrigger}
            />
          </motion.div>
        ) : (
          <motion.div
            key="secret-view"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <DivergentGarden
              gardenData={birthdayContent.secretGarden}
              onBack={handleBackToPublic}
            />
            <CinematicFinale finaleData={birthdayContent.finale} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
