import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shelters from './pages/Shelters';
import ShelterDetails from './pages/ShelterDetails';
import Voting from './pages/Voting';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { TMAService } from './services/tma.service';
import { TonService } from './services/ton.service';
import './i18n';

// Импортируем страницы, даже если они пока не существуют
import SplashScreenV2 from './pages/SplashScreenV2';

interface AppProps {
  tma: TMAService;
  ton: TonService;
}

const App: React.FC<AppProps> = ({ tma, ton }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Инициализация приложения
        await tma.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };

    init();
  }, [tma]);

  // Пока приложение не инициализировано, можно показать сплеш-скрин
  if (!isInitialized) {
    return <SplashScreenV2 />;
    // return <SplashScreenDaily />;
  }

  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-connect/demo-dapp/master/tonconnect-manifest.json">
      <ScrollToTop />
      <Layout tma={tma} ton={ton}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/shelters/:id" element={<ShelterDetails />} />
          <Route path="/voting" element={<Voting ton={ton} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AnimatePresence>
      </Layout>
    </TonConnectUIProvider>
  );
};

export default App;
