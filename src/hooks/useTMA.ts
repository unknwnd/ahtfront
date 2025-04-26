import { useEffect, useState } from 'react';
import { tmaService } from '../services/tma.service';
import { useTheme } from './useTheme';

// Определяем тип для пользователя Telegram
interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export const useTMA = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    // Проверяем готовность TMA SDK
    const isTMAReady = tmaService.isReady();
    setIsReady(isTMAReady);
    
    if (isTMAReady) {
      // Получаем данные пользователя
      const userData = tmaService.getUserData() as TelegramUser | null;
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
    tma: tmaService,
    showAlert: (message: string) => tmaService.showAlert(message),
    showConfirm: (message: string, callback: (confirmed: boolean) => void) => 
      tmaService.showConfirm(message, callback),
    setupMainButton: (params?: { text: string; onClick: () => void }) => {
      tmaService.setupMainButton(params);
    },
    hideMainButton: () => tmaService.hideMainButton(),
    close: () => tmaService.close(),
    sendData: (data: unknown) => tmaService.sendData(data),
  };
};