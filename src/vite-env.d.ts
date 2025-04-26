/// <reference types="vite/client" />

// Определения типов для TMA SDK
interface Window {
  Telegram: {
    WebApp: any;
  };
  Buffer: typeof Buffer;
  global: typeof globalThis;
}

// Расширение для глобальных объектов в браузере
declare global {
  interface Window {
    Buffer: typeof Buffer;
    global: typeof globalThis;
  }
}
