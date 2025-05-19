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
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  
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
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Определяем классы для разных страниц
  const getMainClasses = () => {
    const baseClasses = "relative z-10 w-full h-full overflow-y-auto overflow-x-hidden scrollable-container";
    
    if (isHomePage) {
      return `${baseClasses} main-container`;
    }
    
    return baseClasses;
  };

  return (
    <div
      className={
        `min-h-screen h-[calc(100*var(--vh,1vh))] w-screen w-full overflow-x-hidden bg-brand-gray dark:bg-[#1E172B] text-brand-blue-dark dark:text-white transition-colors duration-300`
      }
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(143,193,227,0.05) 0%, transparent 80%)',
      }}
    >
      <div ref={scrollableContainerRef} className={getMainClasses()}>
        <main className="pt-0 pb-16 px-0 w-full h-full">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 