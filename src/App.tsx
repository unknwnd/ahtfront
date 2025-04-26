import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shelter from './pages/Shelter';
import Community from './pages/Community';
import CommDetails from './pages/CommDetails';
import Voting from './pages/Voting';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { TMAService } from './services/tma.service';
import { TonService } from './services/ton.service';
import './i18n';

// Импортируем страницы, даже если они пока не существуют
import SplashScreenV2 from './pages/SplashScreenV2';
import SplashScreenDaily from './pages/SplashScreenDaily';

interface AppProps {
  tma: TMAService;
  ton: TonService;
}

const App: React.FC<AppProps> = ({ tma, ton }) => {
  const navigate = useNavigate();
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
      <Layout tma={tma} ton={ton}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommDetails />} />
          <Route path="/voting" element={<Voting ton={ton} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </TonConnectUIProvider>
  );
};

export default App;
