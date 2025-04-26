import { useEffect, useState } from 'react';
import { tmaService } from '@services/tma.service';
import { useTheme } from './useTheme';

export const useTMA = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    // Проверяем готовность TMA SDK
    const isTMAReady = tmaService.isReady();
    setIsReady(isTMAReady);
    
    if (isTMAReady) {
      // Получаем данные пользователя
      const userData = tmaService.getUserData();
      setUser(userData);
      
      // Синхронизируем тему приложения с темой Telegram
      const tgTheme = tmaService.getColorScheme();
      if (tgTheme !== theme) {
        toggleTheme();
      }
    }
  }, [theme, toggleTheme]);

  return {
    isReady,
    user,
    showAlert: tmaService.showAlert.bind(tmaService),
    showConfirm: tmaService.showConfirm.bind(tmaService),
    setupMainButton: tmaService.setupMainButton.bind(tmaService),
    hideMainButton: tmaService.hideMainButton.bind(tmaService),
    close: tmaService.close.bind(tmaService),
    sendData: tmaService.sendData.bind(tmaService),
  };
}; 