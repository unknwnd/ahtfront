import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Community from '@/pages/Community';
import Voting from '@/pages/Voting';
import Profile from '@/pages/Profile';
import { TMAService } from '@/services/tma.service';
import { TonService } from '@/services/ton.service';
import './i18n';

interface AppProps {
  tma: TMAService;
  ton: TonService;
}

const App: React.FC<AppProps> = ({ tma, ton }) => {
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
    return null;
    // return <SplashScreenDaily />;
  }

  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-connect/demo-dapp/master/tonconnect-manifest.json">
      <ScrollToTop />
      <Layout tma={tma} ton={ton}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/voting" element={<Voting ton={ton} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </TonConnectUIProvider>
  );
};

export default App;
