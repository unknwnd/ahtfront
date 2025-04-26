import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { useTMA } from '../../hooks/useTMA';
import { useTheme } from '../../hooks/useTheme';
import { TMAService } from '../../services/tma.service';
import { TonService } from '../../services/ton.service';

interface LayoutProps {
  children: ReactNode;
  tma?: TMAService;
  ton?: TonService;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isReady, tma: tmaHook } = useTMA();
  const { theme } = useTheme();
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Используем tmaHook из хука, так как свойство tma может быть не передано
  const tma = tmaHook;
  
  // Проверяем, находимся ли мы на главной странице
  const isHomePage = location.pathname === '/';
  
  // Синхронизируем цветовую схему с Telegram при изменении маршрута
  useEffect(() => {
    if (isReady) {
      const appTheme = tma.getColorScheme();
      if (theme !== appTheme) {
        console.log('Sync theme with TMA:', appTheme);
      }
    }
  }, [location.pathname, isReady, tma, theme]);

  // Устанавливаем CSS-переменные для мобильных устройств
  useEffect(() => {
    // Установка высоты области просмотра (viewport height)
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Установка ширины области просмотра (viewport width)
    const setViewportWidth = () => {
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    };

    // Инициализация
    setViewportHeight();
    setViewportWidth();

    // Обновление при изменении размера окна или ориентации
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('resize', setViewportWidth);
    window.addEventListener('orientationchange', setViewportHeight);
    window.addEventListener('orientationchange', setViewportWidth);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('resize', setViewportWidth);
      window.removeEventListener('orientationchange', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportWidth);
    };
  }, []);

  // Сбрасываем позицию прокрутки при смене страницы
  useEffect(() => {
    // Сбрасываем скролл основного контейнера
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className={`min-h-screen h-[calc(100*var(--vh,1vh))] w-screen max-w-full overflow-x-hidden bg-brand-gray dark:bg-dark-900 text-brand-blue-dark dark:text-white transition-colors duration-300`}>
      <div className="absolute inset-0 bg-brand-blue-light/5 dark:bg-transparent z-0 pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        <main ref={mainRef} className="pt-0 pb-24 px-4 w-full h-full overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-5xl mx-auto">
              {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 