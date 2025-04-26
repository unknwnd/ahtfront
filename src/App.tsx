import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Настройки для предотвращения предупреждений о будущих версиях
const future = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

// Контекст для темной темы и TON кошелька
import { ThemeProvider } from './context/ThemeContext';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Компоненты для лейаута
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';

// Компонент для сброса позиции прокрутки при навигации
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Мгновенная прокрутка без задержки
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Расширяем глобальный интерфейс Window
declare global {
  interface Window {
    resetVisitFlag: () => void;
  }
}

// Ленивая загрузка страниц
const Home = lazy(() => import('./pages/Home'));
const Comms = lazy(() => import('./pages/Shelters'));
const CommDetails = lazy(() => import('./pages/CommDetails'));
const Voting = lazy(() => import('./pages/Voting'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SplashScreen = lazy(() => import('./pages/SplashScreen'));
const SplashScreenV2 = lazy(() => import('./pages/SplashScreenV2'));
const SplashScreenDaily = lazy(() => import('./pages/SplashScreenDaily'));

// Функция для сброса флага посещения (для тестирования)
window.resetVisitFlag = function() {
  localStorage.removeItem('hasVisitedAnimalHelper');
  console.log('Флаг первого посещения сброшен. Теперь вы увидите SplashScreen.');
  // Перезагружаем страницу для применения изменений
  window.location.reload();
};

function App() {
  // Конфигурация для TON Connect
  const manifestUrl = 'https://raw.githubusercontent.com/ton-connect/demo-dapp-with-react/main/public/tonconnect-manifest.json';
  
  // Нормальная логика проверки первого визита
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Проверяем, было ли уже первое посещение
    const hasVisited = localStorage.getItem('hasVisitedAnimalHelper');
    setIsFirstVisit(hasVisited !== 'true');
    
    // Добавляем отладочный лог
    console.log('Первое посещение?', hasVisited !== 'true');
  }, []);
  
  // Если состояние еще не определено, показываем загрузочный экран
  if (isFirstVisit === null) {
    return <LoadingScreen />;
  }

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ThemeProvider>
        <Router future={future}>
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Упрощаем логику: если первое посещение, переадресуем на SplashScreen,
                  а если нет, то на главную */}
              <Route path="/" element={
                isFirstVisit 
                  ? <Navigate to="/splash" replace /> 
                  : (
                    <Layout>
                      <Home />
                    </Layout>
                  )
              } />
              
              {/* Добавляем выделенный маршрут для SplashScreen */}
              <Route path="/splash" element={<SplashScreen />} />
              
              {/* Тестовый маршрут для просмотра SplashScreen */}
              <Route path="/test-splash" element={<SplashScreen />} />
              
              {/* Маршрут для просмотра новой версии SplashScreen */}
              <Route path="/test-splash-v2" element={<SplashScreenV2 />} />
              
              {/* Маршрут для просмотра ежедневного SplashScreen */}
              <Route path="/test-splash-daily" element={<SplashScreenDaily />} />
              
              {/* Остальные маршруты с Layout */}
              <Route path="/shelters" element={
                <Layout>
                  <Comms />
                </Layout>
              } />
              <Route path="/comms/:id" element={
                <Layout>
                  <CommDetails />
                </Layout>
              } />
              <Route path="/voting" element={
                <Layout>
                  <Voting />
                </Layout>
              } />
              <Route path="/profile" element={
                <Layout>
                  <Profile />
                </Layout>
              } />
              <Route path="*" element={
                <Layout>
                  <NotFound />
                </Layout>
              } />
            </Routes>
          </Suspense>
        </Router>
        <ToastContainer position="bottom-right" theme="colored" />
      </ThemeProvider>
    </TonConnectUIProvider>
  );
}

export default App;
