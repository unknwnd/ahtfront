/* Заглушка для i18n */

// Определение типов для ресурсов
interface Translation {
  [key: string]: string;
}

interface LanguageResources {
  translation: Translation;
}

interface Resources {
  [lang: string]: LanguageResources;
}

// Простая заглушка для инициализации i18next без использования внешних библиотек
const resources: Resources = {
  ru: {
    translation: {
      // Общие фразы
      'app.name': 'Animal Helper Token',
      'app.loading': 'Загрузка...',
      
      // Навигация
      'nav.home': 'Главная',
      'nav.shelters': 'Приюты',
      'nav.voting': 'Голосования',
      'nav.profile': 'Профиль',
      
      // Кнопки
      'button.connect': 'Подключить кошелек',
      'button.disconnect': 'Отключить',
      'button.donate': 'Пожертвовать',
      'button.vote': 'Голосовать',
      'button.details': 'Подробнее',
      
      // Ошибки
      'error.wallet': 'Ошибка кошелька',
      'error.connection': 'Ошибка соединения',
    }
  },
  en: {
    translation: {
      // Общие фразы
      'app.name': 'Animal Helper Token',
      'app.loading': 'Loading...',
      
      // Навигация
      'nav.home': 'Home',
      'nav.shelters': 'Shelters',
      'nav.voting': 'Voting',
      'nav.profile': 'Profile',
      
      // Кнопки
      'button.connect': 'Connect Wallet',
      'button.disconnect': 'Disconnect',
      'button.donate': 'Donate',
      'button.vote': 'Vote',
      'button.details': 'Details',
      
      // Ошибки
      'error.wallet': 'Wallet Error',
      'error.connection': 'Connection Error',
    }
  }
};

// Заглушка для i18next
const i18n = {
  t: (key: string): string => {
    const lang = 'ru'; // По умолчанию русский
    
    try {
      return resources[lang]?.translation[key] || key;
    } catch {
      return key;
    }
  },
  changeLanguage: (lang: string): void => {
    console.log(`Changed language to: ${lang}`);
  }
};

export default i18n; 