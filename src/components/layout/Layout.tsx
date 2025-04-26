import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <div className={`min-h-screen bg-brand-gray dark:bg-dark-900 text-brand-blue-dark dark:text-white transition-colors duration-300`}>
      <div className="absolute inset-0 bg-brand-blue-light/5 dark:bg-transparent z-0 pointer-events-none" />
      <div className="relative z-10">
        <main className="pt-0 pb-24 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 