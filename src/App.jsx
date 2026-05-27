import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import SplashScreen from './components/SplashScreen';
import TourGuide from './components/Tour/TourGuide';
import Navigation from './components/Layout/Navigation';
import Home from './pages/Home';
import ScannerPage from './pages/ScannerPage';
import GuidePage from './pages/GuidePage';
import BinsPage from './pages/BinsPage';
import InfoPage from './pages/InfoPage';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/scanner" element={<PageWrapper><ScannerPage /></PageWrapper>} />
        <Route path="/guide"   element={<PageWrapper><GuidePage /></PageWrapper>} />
        <Route path="/bins"    element={<PageWrapper><BinsPage /></PageWrapper>} />
        <Route path="/info"    element={<PageWrapper><InfoPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Tras el splash, muestra el tour si es la primera visita
    if (!showSplash && !localStorage.getItem('ecosort_tour_seen')) {
      setShowTour(true);
    }
  }, [showSplash]);

  const handleTourFinish = () => {
    localStorage.setItem('ecosort_tour_seen', '1');
    setShowTour(false);
  };

  return (
    <HashRouter>
      {/* Splash */}
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      {/* Tour */}
      {showTour && !showSplash && <TourGuide onFinish={handleTourFinish} />}

      {/* App shell */}
      <div className="h-full flex flex-col bg-primary-50">
        <div className="flex-1 relative overflow-hidden">
          <AppRoutes />
        </div>
        <Navigation />
      </div>
    </HashRouter>
  );
}
