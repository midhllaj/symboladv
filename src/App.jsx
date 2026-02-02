import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/utils/SmoothScroll';
import Navbar from './components/layout/Navbar';
import MenuOverlay from './components/Header';
import Footer from './components/layout/StickyFooter';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import About from './pages/About';
import DigitalExperiencesPage from './pages/DigitalExperiencesPage';
import ConferencesPage from './pages/ConferencesPage';
import SignboardPage from './pages/SignboardPage';
import ErpSolutionPage from './pages/ErpSolutionPage';
import ConstructionPage from './pages/ConstructionPage';
import Preloader from './components/Preloader';
import GradientCursor from './components/GradientCursor/GradientCursor';
import ContactModal from './components/ui/ContactModal';

const AppLayout = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const isPortfolio = location.pathname === '/portfolio';
  const isAbout = location.pathname === '/about';
  const isDigitalExperiences = location.pathname === '/digital-experiences';
  const isConferences = location.pathname === '/conferences';
  const isSignboard = location.pathname === '/signboard';
  const isErpSolutions = location.pathname === '/erp-solutions';
  const isConstruction = location.pathname === '/construction';

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line
    if (menuActive) setMenuActive(false);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="font-sans antialiased text-white selection:bg-purple-500 selection:text-white">
      <GradientCursor />
      <MenuOverlay isActive={menuActive} />
      <Navbar menuActive={menuActive} setMenuActive={setMenuActive} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/digital-experiences" element={<DigitalExperiencesPage />} />
        <Route path="/conferences" element={<ConferencesPage />} />
        <Route path="/signboard" element={<SignboardPage />} />
        <Route path="/erp-solutions" element={<ErpSolutionPage />} />
        <Route path="/construction" element={<ConstructionPage />} />
      </Routes>
      {!isErpSolutions && <Footer />}
      <ContactModal />
    </div>
  );
};

function App() {
  return (
    <Router>
      <PreloaderWrapper />
    </Router>
  );
}

function PreloaderWrapper() {
  const [hasVisited, setHasVisited] = useState(() => {
    return sessionStorage.getItem('hasVisited') === 'true';
  });
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage && !hasVisited) {
      // eslint-disable-next-line
      setHasVisited(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, [isHomePage, hasVisited]);

  const handleComplete = () => {
    setHasVisited(true);
    sessionStorage.setItem('hasVisited', 'true');
  };

  const showPreloader = !hasVisited && isHomePage;

  return (
    <>
      <AnimatePresence mode='wait'>
        {showPreloader && <Preloader onComplete={handleComplete} />}
      </AnimatePresence>
      <SmoothScroll />
      {!showPreloader && <AppLayout />}
    </>
  );
}

export default App;
