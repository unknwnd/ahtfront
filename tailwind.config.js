/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // Добавляем пользовательские брейкпоинты для мобильных устройств
    screens: {
      'xs': '320px', // Минимальный размер для маленьких экранов (iPhone SE, старые Android)
      'sm': '375px', // Стандартный размер для большинства iPhone и Android
      'md': '414px', // Большие мобильные устройства (iPhone Plus, Pixel XL)
      'lg': '768px', // Планшеты (iPad)
      'xl': '1024px', // Большие планшеты и маленькие десктопы
      '2xl': '1440px', // Стандартные десктопы
    },
    extend: {
      colors: {
        // Новая цветовая палитра, взятая с изображения
        brand: {
          // Оливковый
          olive: '#687864',
          // Голубые оттенки
          blue: {
            dark: '#31708E',
            medium: '#5085A5',
            light: '#8FC1E3',
          },
          // Светлый серо-голубой
          gray: '#F7F9FB',
        },
        
        // Основная тёмная тема с эффектом глубины
        dark: {
          900: '#141414', // Самый темный фон
          800: '#1A1A1A', // Фон карточек
          700: '#222222', // Фон для элементов с глубиной
          600: '#2A2A2A', // Фон для элементов с глубиной второго уровня
          500: '#333333', // Фон активных элементов
          400: '#444444', // Бордеры
          300: '#666666', // Вторичный текст
          200: '#999999', // Умеренно важный текст
          100: '#CCCCCC', // Обычный текст
          50: '#FFFFFF',  // Акцентный текст
        },
        // Telegram-подобные цвета
        telegram: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
          950: '#082c5c',
        },
        // Обновляем primary цвета в соответствии с изображением
        primary: {
          50: '#E6EFF5',
          100: '#CCE0EB',
          200: '#8FC1E3', // Светло-голубой с изображения #8FC1E3
          300: '#5085A5', // Средне-голубой с изображения #5085A5
          400: '#31708E', // Тёмно-голубой с изображения #31708E
          500: '#31708E', // Основной цвет кнопок
          600: '#285F78', // Затемнённый на 10% для hover
          700: '#224E62', // Затемнённый для active
          800: '#193D4D',
          900: '#132C38',
          950: '#0B1A21',
        },
        secondary: {
          50: '#F0F4F0',
          100: '#E0E9E0',
          200: '#C2D3C2',
          300: '#A4BDA4',
          400: '#86A786',
          500: '#687864', // Оливковый с изображения #687864
          600: '#586554', // Затемнённый для hover
          700: '#485244', 
          800: '#383E35',
          900: '#282B25',
          950: '#191B18',
        },
        // Цвета для светлой/темной темы
        tg: {
          light: {
            bg: 'var(--tg-theme-bg-color, #F7F9FB)', // Фоллбэк, если переменная не задана
            text: 'var(--tg-theme-text-color, #333333)',
            secondaryBg: 'var(--tg-theme-secondary-bg-color, #E6EFF5)',
            hint: 'var(--tg-theme-hint-color, #5085A5)',
            link: 'var(--tg-theme-link-color, #31708E)',
            button_bg: 'var(--tg-theme-button-color, #31708E)',
            button_text: 'var(--tg-theme-button-text-color, #FFFFFF)',
            destructive_text: 'var(--tg-theme-destructive-text-color, #FF3B30)',
            header_bg: 'var(--tg-theme-header-bg-color, #F7F9FB)',
            accent_text: 'var(--tg-theme-accent-text-color, #31708E)',
            section_bg: 'var(--tg-theme-section-bg-color, #FFFFFF)',
            section_header_text: 'var(--tg-theme-section-header-text-color, #5085A5)',
            subtitle_text: 'var(--tg-theme-subtitle-text-color, #666666)',
          },
          dark: {
            bg: 'var(--tg-theme-bg-color, #1A1A1A)',
            text: 'var(--tg-theme-text-color, #F7F9FB)',
            secondaryBg: 'var(--tg-theme-secondary-bg-color, #222222)',
            hint: 'var(--tg-theme-hint-color, #999999)',
            link: 'var(--tg-theme-link-color, #5085A5)',
            button_bg: 'var(--tg-theme-button-color, #5085A5)',
            button_text: 'var(--tg-theme-button-text-color, #FFFFFF)',
            destructive_text: 'var(--tg-theme-destructive-text-color, #FF453A)',
            header_bg: 'var(--tg-theme-header-bg-color, #1A1A1A)',
            accent_text: 'var(--tg-theme-accent-text-color, #5085A5)',
            section_bg: 'var(--tg-theme-section-bg-color, #1A1A1A)', // Для темной темы секции могут быть того же цвета, что и фон, или чуть светлее
            section_header_text: 'var(--tg-theme-section-header-text-color, #999999)',
            subtitle_text: 'var(--tg-theme-subtitle-text-color, #CCCCCC)',
          }
        }
      },
      fontFamily: {
        sans: ['Ysabeau SC', 'sans-serif'],
        'actay-wide': ['ActayWide-Bold', 'sans-serif'],
      },
      fontSize: {
        // Уменьшенные размеры текста для мобильных устройств
        'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '3' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '3.75' }], // 60px
        '7xl': ['4.5rem', { lineHeight: '4.5' }], // 72px
        '8xl': ['5.25rem', { lineHeight: '5.25' }], // 84px
        '9xl': ['6rem', { lineHeight: '6' }], // 96px
        '10xl': ['6.75rem', { lineHeight: '6.75' }], // 108px
        '11xl': ['7.5rem', { lineHeight: '7.5' }], // 120px
        '12xl': ['8.25rem', { lineHeight: '8.25' }], // 132px
        '13xl': ['9rem', { lineHeight: '9' }], // 144px
        '14xl': ['9.75rem', { lineHeight: '9.75' }], // 156px
        '15xl': ['10.5rem', { lineHeight: '10.5' }], // 168px
        '16xl': ['11.25rem', { lineHeight: '11.25' }], // 180px
        '17xl': ['12rem', { lineHeight: '12' }], // 192px
        '18xl': ['12.75rem', { lineHeight: '12.75' }], // 204px
        '19xl': ['13.5rem', { lineHeight: '13.5' }], // 216px
        '20xl': ['14.25rem', { lineHeight: '14.25' }], // 228px
        '21xl': ['15rem', { lineHeight: '15' }], // 240px
        '22xl': ['15.75rem', { lineHeight: '15.75' }], // 252px
        '23xl': ['16.5rem', { lineHeight: '16.5' }], // 264px
        '24xl': ['17.25rem', { lineHeight: '17.25' }], // 276px
        '25xl': ['18rem', { lineHeight: '18' }], // 288px
        '26xl': ['18.75rem', { lineHeight: '18.75' }], // 300px
        '27xl': ['19.5rem', { lineHeight: '19.5' }], // 312px
        '28xl': ['20.25rem', { lineHeight: '20.25' }], // 324px
        '29xl': ['21rem', { lineHeight: '21' }], // 336px
        '30xl': ['21.75rem', { lineHeight: '21.75' }], // 348px
        '31xl': ['22.5rem', { lineHeight: '22.5' }], // 360px
        '32xl': ['23.25rem', { lineHeight: '23.25' }], // 372px
        '33xl': ['24rem', { lineHeight: '24' }], // 384px
        '34xl': ['24.75rem', { lineHeight: '24.75' }], // 396px
        '35xl': ['25.5rem', { lineHeight: '25.5' }], // 408px
        '36xl': ['26.25rem', { lineHeight: '26.25' }], // 420px
        '37xl': ['27rem', { lineHeight: '27' }], // 432px
        '38xl': ['27.75rem', { lineHeight: '27.75' }], // 444px
      },
      borderRadius: {
        'tg': '10px', // Типичное скругление для Telegram
        'tg-lg': '16px',
        'tg-sm': '8px',
        // Новые радиусы для карточек
        'card': '12px', // Обновляем для соответствия tg
        'card-sm': '8px',
        // Уменьшенные радиусы для мобильных устройств
        'mobile': '10px',
        'mobile-sm': '8px',
      },
      boxShadow: {
        'tg': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)', // Более плоская тень
        'depth': '0px 4px 10px rgba(0, 0, 0, 0.05)', // Уменьшенная глубина
        'depth-sm': '0px 2px 4px rgba(0, 0, 0, 0.05)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
        'highlight': '0 0 0 1px rgba(0, 0, 0, 0.05)', // Менее заметный хайлайт
        'primary-glow': '0 0 10px var(--tg-theme-button-color, #31708E)', // Используем цвет кнопки для свечения
        'secondary-glow': '0 0 10px var(--tg-theme-link-color, #5085A5)',
        'mobile-depth': '0px 3px 6px rgba(0, 0, 0, 0.04)',
        'mobile-depth-sm': '0px 1px 3px rgba(0, 0, 0, 0.04)',
        'mobile-glow': '0 0 6px var(--tg-theme-button-color, #31708E)',
      },
      spacing: {
        // Уменьшенные отступы для мобильных устройств
        'mobile-xs': '0.125rem', // 2px
        'mobile-sm': '0.25rem', // 4px
        'mobile-md': '0.5rem', // 8px
        'mobile-lg': '1rem', // 16px
        'mobile-xl': '1.5rem', // 24px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} 