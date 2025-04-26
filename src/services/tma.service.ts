// Временная заглушка для TMA SDK, так как текущая версия устарела
// Используйте @telegram-apps/sdk в будущем

// Определение интерфейса для Telegram WebApp
interface TelegramWebApp {
  ready: () => void;
  colorScheme: string;
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
  };
  close: () => void;
  sendData: (data: string) => void;
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
  openLink: (url: string) => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
}

// Определяем тип для Telegram
interface TelegramType {
  WebApp?: TelegramWebApp;
}

export class TMAService {
  private webApp: TelegramWebApp | null = null;

  constructor() {
    // Инициализация перенесена в метод initialize
  }

  // Метод для инициализации WebApp
  async initialize(): Promise<void> {
    // Инициализация WebApp из Telegram
    if (typeof window !== 'undefined') {
      const telegram = window as Window & { Telegram?: TelegramType };
      this.webApp = telegram.Telegram?.WebApp || null;
      if (this.webApp) {
        this.webApp.ready();
        console.log('Telegram WebApp initialized');
      }
    }
    return Promise.resolve();
  }

  isReady(): boolean {
    return !!this.webApp;
  }

  getColorScheme(): string {
    return this.webApp?.colorScheme || 'light';
  }

  setupMainButton(params?: { text: string; onClick: () => void }): void {
    if (!this.webApp) return;
    
    if (params?.text) {
      this.webApp.MainButton.setText(params.text);
    }
    
    if (params?.onClick) {
      this.webApp.MainButton.onClick(params.onClick);
    }
    
    this.webApp.MainButton.show();
  }

  hideMainButton(): void {
    this.webApp?.MainButton.hide();
  }

  close(): void {
    this.webApp?.close();
  }

  sendData(data: unknown): void {
    this.webApp?.sendData(JSON.stringify(data));
  }

  getUserData(): unknown {
    return this.webApp?.initDataUnsafe?.user || null;
  }

  showAlert(message: string): void {
    this.webApp?.showAlert(message);
  }

  showConfirm(message: string, callback: (confirmed: boolean) => void): void {
    if (this.webApp) {
      this.webApp.showConfirm(message, callback);
    } else {
      const confirmed = window.confirm(message);
      callback(confirmed);
    }
  }

  // Открываем ссылку в браузере
  openLink(url: string): void {
    if (this.webApp) {
      this.webApp.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  }
}

export const tmaService = new TMAService();