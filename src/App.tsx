import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { TMAService } from '@/services/tma.service';
import { TonService } from '@/services/ton.service';
import './i18n';

// Lazy loading для страниц
const Home = React.lazy(() => import('@/pages/Home'));
const Community = React.lazy(() => import('@/pages/Community'));
const Voting = React.lazy(() => import('@/pages/Voting'));
const Profile = React.lazy(() => import('@/pages/Profile'));

// Компонент загрузки
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

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

  // Пока приложение не инициализировано, показываем загрузку
  if (!isInitialized) {
    return <PageLoader />;
  }

  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-connect/demo-dapp/master/tonconnect-manifest.json">
      <Layout tma={tma} ton={ton}>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </Layout>
    </TonConnectUIProvider>
  );
};

export default App;
