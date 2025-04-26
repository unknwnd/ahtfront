import { WebApp } from '@tma.js/sdk';

class TMAService {
  private webApp: typeof WebApp | null = null;
  private isInitialized = false;

  constructor() {
    // Проверяем, доступен ли Telegram Web App
    this.initialize();
  }

  // Инициализация TMA
  initialize() {
    try {
      if (window?.Telegram?.WebApp) {
        this.webApp = window.Telegram.WebApp;
        this.webApp.ready();
        this.isInitialized = true;
        
        // Настройка некоторых базовых параметров WebApp
        this.webApp.expand();
        
        // Устанавливаем цвет кнопки "Назад" в соответствии с темой
        const isDarkTheme = this.webApp.colorScheme === 'dark';
        this.webApp.setBackgroundColor(isDarkTheme ? '#1F2937' : '#F9FAFB');
        
        console.log('TMA SDK успешно инициализирован');
      } else {
        console.warn('Telegram WebApp не обнаружен. Работаем в режиме браузера.');
      }
    } catch (error) {
      console.error('Ошибка при инициализации TMA SDK:', error);
    }
  }

  // Проверка инициализации
  isReady(): boolean {
    return this.isInitialized;
  }

  // Получение темы Telegram
  getColorScheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'light';
  }

  // Получение данных пользователя из Telegram
  getUserData() {
    if (!this.isInitialized) return null;
    
    try {
      const initData = this.webApp?.initData;
      if (!initData) return null;
      
      // Здесь должна быть валидация initData перед использованием
      // через @grammyjs/validator для защиты от подделки
      
      return this.webApp?.initDataUnsafe?.user || null;
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      return null;
    }
  }

  // Показать всплывающее сообщение в Telegram
  showAlert(message: string) {
    if (!this.isInitialized) {
      console.warn('TMA не инициализирован, алерт не будет показан');
      return;
    }
    
    this.webApp?.showAlert(message);
  }

  // Показать всплывающее сообщение с подтверждением в Telegram
  showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isInitialized) {
        console.warn('TMA не инициализирован, диалог не будет показан');
        resolve(false);
        return;
      }
      
      this.webApp?.showConfirm(message, (confirmed) => {
        resolve(confirmed);
      });
    });
  }

  // Закрыть мини-приложение
  close() {
    if (this.isInitialized) {
      this.webApp?.close();
    }
  }

  // Настройка кнопки основного действия в верхней панели Telegram
  setupMainButton(text: string, color: string, textColor: string, callback: () => void) {
    if (!this.isInitialized) return;
    
    const mainButton = this.webApp?.MainButton;
    if (!mainButton) return;
    
    mainButton.setText(text);
    mainButton.setParams({
      color: color,
      text_color: textColor,
    });
    
    mainButton.onClick(callback);
    mainButton.show();
  }

  // Скрыть кнопку основного действия
  hideMainButton() {
    if (this.isInitialized && this.webApp?.MainButton) {
      this.webApp.MainButton.hide();
    }
  }

  // Отправить данные боту Telegram
  sendData(data: string) {
    if (!this.isInitialized) {
      console.warn('TMA не инициализирован, данные не будут отправлены');
      return;
    }
    
    this.webApp?.sendData(data);
  }
}

// Экспортируем синглтон сервиса
export const tmaService = new TMAService(); 